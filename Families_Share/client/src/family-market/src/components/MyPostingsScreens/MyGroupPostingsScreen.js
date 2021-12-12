import withLanguage from "../../../../components/LanguageContext";

const PropTypes = require("prop-types");
const ApiHandler = require("../../api/ApiHandler");
const {FAMILY_MARKET_BASE_PAGE_URL} = require( "../../constants");
const React = require("react");
const Log = require("../../../../components/Log");
const PlainNavBar = require("../PlainNavBar");
const PostingsList = require("../PostingsList/PostingsList");
const texts = require("../../texts");

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

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);
        this.apiHandler = new ApiHandler();
        this.matchParams = this.props.match.params;
        this.state = {
            group_name: "",
            postings: []
        };
    }

    render() {
        const txt = texts[language].myGroupsPostingsScreen;

        return (
            <div>
                <div>
                    <PlainNavBar title={txt.prefix + this.state.group_name} goBackUrl={""}/>
                </div>
                <div>
                    <PostingsList title={""} postings={this.state.postings} />
                </div>
            </div>
        );

    }

    async componentDidMount() {

        const currentGroupPostings = await this.fetchPostings();
        const group_info = await this.apiHandler.getGroupInfo(this.matchParams.groupId);

        this.setState({
            group_name: group_info.name,
            postings: currentGroupPostings
        });
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

export default {
    MyGroupPostingsScreen: withLanguage(MyGroupPostingsScreen),
    MyGroupPostingsScreenRoute: MyGroupPostingsScreen.ROUTE,
    buildRedirectionHandler: MyGroupPostingsScreen.buildRedirectionHandler
};
