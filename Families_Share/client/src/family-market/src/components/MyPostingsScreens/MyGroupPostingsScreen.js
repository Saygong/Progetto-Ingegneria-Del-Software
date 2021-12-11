import withLanguage from "../../../../components/LanguageContext";

const PropTypes = require("prop-types");

const Posting = require("../../api/model/Posting");
const GroupInfo = require("../../api/model/GroupInfo");

const {FAMILY_MARKET_BASE_PAGE_URL} = require( "../../constants");

const React = require("react");
const Log = require("../../../../components/Log");
const PlainNavBar = require("../PlainNavBar");
const PostingsList = require("../PostingsList/PostingsList");


/**
 * Class that represents the screen where all of a group's postings are displayed.
 */
class MyGroupPostingsScreen extends React.Component {

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{userId: string, groupId: string}}
     */
    matchParams;

    /**
     * @type {{postings: Posting[]}}
     */
    state;

    constructor(props) {
        super(props);

        this.matchParams = this.props.match.params;
        this.state = {
            postings: []
        };
    }

    render() {
        return (
            <div>

            </div>
        );
        // TODO postings si prendono da state
    }

    async componentDidMount() {
        // get postings
    }

    /**
     * Returns the postings of the current user in this group.
     * @return {Promise<Posting[] | []>}
     */
    async fetchPostings() {
        const userId = this.matchParams.userId;
        const groupId = this.matchParams.groupId;

        return this.apiHandler.getUserPostings(userId, groupId);
    }

    /**
     * Returns a url used to redirect to this page.
     * @param userId {string} id of the user to get the postings of
     * @param groupId {string} id of the group that the user postings belong to
     * @return {string}
     */
    static buildUrl(userId, groupId) {
        const route = MyGroupPostingsScreen.ROUTE;
        const withUserId = route.replace(":userId", userId);

        return withUserId.replace(":groupId", groupId);
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/users/:userId/groups/:groupId/postings";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param userId {string} id of the user to get the postings of
     * @param groupId {string} id of the group that the user postings belong to
     * @return {function}
     */
    static buildRedirectionHandler(history, userId, groupId) {
        return () => {
            history.push(MyGroupPostingsScreen.buildUrl(userId, groupId))
        }
    }
}

MyGroupPostingsScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = {
    MyGroupPostingsScreen: withLanguage(MyGroupPostingsScreen),
    MyGroupPostingsScreenRoute: MyGroupPostingsScreen.ROUTE,
    buildRedirectionHandler: MyGroupPostingsScreen.buildRedirectionHandler
};
