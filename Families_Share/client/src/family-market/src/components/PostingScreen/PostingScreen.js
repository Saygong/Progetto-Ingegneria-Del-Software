import withLanguage from "../../../../components/LanguageContext";
import ToggleFavouriteButton from "../ToggleFavouriteButton";
import PostingInfoHeader from "./PostingInfoHeader";
import PostingInfoTabs from "./PostingInfoTabs";

const PropTypes = require("prop-types");
const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");
const {FAMILY_MARKET_BASE_PAGE_URL} = require("../../constants");
const React = require("react");
const Log = require("../../../../components/Log");
const PostingNavBar = require("./PostingNavBar");
const PostingInfo = require("./PostingInfo");


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


    // annuncio_altrui.PNG  manca la foto (?)
    render() {
        return (
            <div>
                <PostingNavBar postingId={this.state.posting.id} postingCreatorId={this.state.posting.user_id} />
                <PostingInfo posting={this.state.posting}/>
                <PostingInfoHeader posting={this.state.posting}/>
                <PostingInfoTabs  posting={this.state.posting}/>

                //TODO vedere se usare questi altrimenti cancellare
                {/*<hr/>*/}
                {/*<div style="width:100%; height:2vh">*/}
                {/*</div>*/}
            </div>
        );
    }

    async componentDidMount() {
        // TODO fetch the posting and set the state, --------> DA CONTROLLARE
        const currentPosting = await this.fetchPosting();
        this.setState({
            posting: currentPosting
        });
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

export default {
    PostingScreen: withLanguage(PostingScreen),
    PostingScreenRoute: PostingScreen.ROUTE,
    buildRedirectionHandler: PostingScreen.buildRedirectionHandler,
    buildUrl: PostingScreen.buildUrl
};
