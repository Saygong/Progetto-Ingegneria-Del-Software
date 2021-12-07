const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");
const GroupInfo = require("../../api/model/GroupInfo");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const GroupList = require("../../../../src/components/GroupList");
const {MY_GROUP_POSTINGS_SCREEN_URL} = require("../../constants");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the screen where all of a group's postings are displayed.
 */
class MyGroupsWithPostingsScreen extends React.Component {

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    // TODO questo diventa una lista di groupinfo
    /**
     * @type {{postingsByGroup: PostingsWithGroupInfo[] | []}}
     */
    state;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.state = {
            postingsByGroup: []
        };

        this.handleNavigation = this.handleNavigation.bind(this);
    }

    render() {
        // TODO PlainNavBar e GroupList (quest'ultimo riadattato per accettare navigation handler)
    }

    async componentDidMount() {
        // TODO chiama getUserPostings e setta lo stato con i postings aggiornati
    }

    async getUserGroups() {

    }

    /**
     * Returns the postings of the current user, divided by group.
     * @return {Promise<PostingsWithGroupInfo[] | []>}
     */
    async getUserPostings(groupId) {
        const userId = JSON.parse(localStorage.getItem("user")).id;

        return this.apiHandler.getUserPostings(userId, groupId);
    }

    /**
     * Called by each group list item when clicked.
     * @param groupInfo {GroupInfo}
     * @return {Promise<void>}
     */
    async handleNavigation(groupInfo) {
        // TODO implementare navigationHandler su GroupListItem
        Log.info("Redirecting to MyGroupPostingsScreen..." + `(${MY_GROUP_POSTINGS_SCREEN_URL})`, this);

        this.props.history.push({
            pathname: MY_GROUP_POSTINGS_SCREEN_URL,
            state: {
                groupInfo: null
            }
        })
    }
}

module.exports = withLanguage(MyGroupsWithPostingsScreen);