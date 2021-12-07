const React = require("react");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const {buildRedirectionHandler} = require("../MyPostingsScreens/MyGroupsWithPostingsScreen");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the button to access the "my postings" section.
 *
 * TODO This button must be added to the ProfileScreen component
 */
class MyPostingsButton extends React.Component {
    constructor(props) {
        super(props);

        // TODO these values are constant since the button is always the same
        this.image = "";
        this.title = "";
        this.description = "";

        this.redirectToMyPostingsScreens = this.redirectToMyPostingsScreens.bind(this);
    }

    render() {
        // TODO this button is a ListItem
    }

    redirectToMyPostingsScreens() {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const redirectionHandler = buildRedirectionHandler(this.props.history, userId);

        Log.info("Redirecting to MyGroupsWithPostingsScreen ", this);

        redirectionHandler();
    }
}

module.exports = withRouter(withLanguage(MyPostingsButton));