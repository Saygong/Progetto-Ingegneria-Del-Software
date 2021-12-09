const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");
const GroupInfo = require("../../api/model/GroupInfo");

const {FAMILY_MARKET_BASE_PAGE_URL} = require("../../constants");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const GroupList = require("../../../../src/components/GroupList");
const {buildRedirectionHandler} = require( "../MyPostingsScreens/MyGroupPostingsScreen");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the screen where all current user's group are displayed.
 * Clicking on one group redirects to a page where all of the group's postings made
 * by the current user are seen.
 */
class MyGroupsWithPostingsScreen extends React.Component {

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{userId: string}}
     */
    matchParams;

    /**
     * @type {{groups: GroupInfo[] | []}}
     */
    state;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.matchParams = this.props.match.params;
        this.state = {
            groups: []
        };

        this.handleNavigation = this.handleNavigation.bind(this);
    }

    render() {
        // TODO PlainNavBar e GroupList (quest'ultimo riadattato per accettare navigation handler)
    }

    async componentDidMount() {
        // TODO chiama getUserGroupsInfo e setta lo stato con i postings aggiornati
    }

    /**
     * Returns the groups that the user belongs to.
     * @return {Promise<GroupInfo[] | []>}
     */
    async fetchUserGroups() {
        const userId = this.matchParams.userId;

        return this.apiHandler.getUserGroups(userId);
    }

    /**
     * Returns a url used to redirect to this page.
     * @param userId {string} id of the user to load the groups of
     * @return {string}
     */
    static buildUrl(userId) {
        const route = MyGroupsWithPostingsScreen.ROUTE;
        return route.replace(":userId", userId);
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/users/:userId/groups";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param userId {string} id of the user to load the groups of
     * @return {function}
     */
    static buildRedirectionHandler(history, userId) {
        return () => {
            history.push(MyGroupsWithPostingsScreen.buildUrl(userId))
        }
    }
}

module.exports = {
    MyGroupsWithPostingsScreen: withLanguage(MyGroupsWithPostingsScreen),
    MyGroupsWithPostingsScreenRoute: MyGroupsWithPostingsScreen.ROUTE,
    buildRedirectionHandler: MyGroupsWithPostingsScreen.buildRedirectionHandler
};