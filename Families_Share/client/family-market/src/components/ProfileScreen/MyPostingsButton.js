const React = require("react");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const {MY_GROUPS_WITH_POSTINGS_SCREEN_URL} = require("../../constants");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the button to access the "my postings" screen.
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
        Log.info("Redirecting to MyGroupsWithPostingsScreen "
            + `(${MY_GROUPS_WITH_POSTINGS_SCREEN_URL})`, this);

        this.props.history.push(MY_GROUPS_WITH_POSTINGS_SCREEN_URL);
    }
}

module.exports = withRouter(withLanguage(MyPostingsButton));