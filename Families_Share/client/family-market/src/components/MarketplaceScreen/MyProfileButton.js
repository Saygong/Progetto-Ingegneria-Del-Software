const React = require("react");
const Log = require("../../../../src/components/Log");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents a button used to go to
 * the profile section of the current user.
 */
class MyProfileButton extends React.Component {

    constructor(props) {
        super(props);

        this.redirectToProfileScreen = this.redirectToProfileScreen.bind(this);
    }

    render() {
        // TODO
    }

    /**
     * Called when the button is clicked.
     */
    redirectToProfileScreen() {
        // Line 322 App.js: path="/profiles/:profileId"
        const profileId = JSON.parse(localStorage.getItem("user"));
        const profileScreenUrl = `/profiles/${profileId}`;

        Log.info("Redirecting to ProfileScreen " + `(${profileScreenUrl})`, this);
        this.props.history.push(profileScreenUrl);
    }
}

module.exports = withRouter(withLanguage(MyProfileButton));