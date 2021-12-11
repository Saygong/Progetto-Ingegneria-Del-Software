const PropTypes = require("prop-types");

const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const {FAMILY_MARKET_BASE_PAGE_URL} = require("../../constants");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PostingNavBar = require("./PostingNavBar");
const PostingInfo = require("./PostingInfo");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the screen where a certain posting is displayed.
 */
class PostingScreen extends React.Component {

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{postingId: string}}
     */
    matchParams;

    /**
     * @type {{posting: Posting}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.matchParams = this.props.match.params;
        this.state = {
            posting: Posting.EMPTY
        }
    }

    render() {
        // TODO PostingNavBar + PostingInfo
    }

    async componentDidMount() {
        // fetch the posting and set the state

    }

    /**
     * Fetch the posting to display in this page.
     * @return {Promise<Posting|Posting.EMPTY>}
     */
    async fetchPosting() {
        const postingId = this.matchParams.postingId;

        return this.apiHandler.getPosting(postingId);
    }

    /**
     * Returns a url used to redirect to this page.
     * @param postingId {string} posting to load
     * @return {string}
     */
    static buildUrl(postingId) {
        const route = PostingScreen.ROUTE;

        return route.replace(":postingId", postingId);
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/posting/:postingId";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param postingId {string} posting to load
     * @return {function}
     */
    static buildRedirectionHandler(history, postingId) {
        return () => {
            history.push(PostingScreen.buildUrl(postingId))
        }
    }
}

PostingScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = {
    PostingScreen: withLanguage(PostingScreen),
    PostingScreenRoute: PostingScreen.ROUTE,
    buildRedirectionHandler: PostingScreen.buildRedirectionHandler
};