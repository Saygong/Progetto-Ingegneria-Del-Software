const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");
const GroupInfo = require("../../api/model/GroupInfo");
const PostingsWithGroupInfo = require("../../api/model/PostingsWithGroupInfo");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const GroupList = require("../../../../src/components/GroupList");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the screen where all of a group's postings are displayed.
 */
class MyGroupPostingsScreen extends React.Component {

    /**
     * @type {ApiHandler}
     */
    apiHandler;

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

    /**
     * Returns the postings of the current user, divided by group.
     * @return {Promise<PostingsWithGroupInfo[] | []>}
     */
    async getUserPostings() {
        const userId = JSON.parse(localStorage.getItem("user")).id;

        return this.apiHandler.getUserPostings(userId);
    }

    handleNavigation(groupId) {
        //TODO redirects to MyGroupPostingsScreen and passes the groups postings as prop


        //xxxx forse meglio fare due nuove classi che estendono grouplist e grouplist item??
        // no perché si ripropone problema della navigazione quando clicchi??
    }
}

module.exports = withLanguage(MyGroupPostingsScreen);