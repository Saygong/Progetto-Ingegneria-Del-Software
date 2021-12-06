const React = require("react");
const Log = require("../../../../src/components/Log");
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
        // TODO send to ProfileScreen ->
        //      probabilmente serve profileId e va inserito nell'url a cui redirezionare
        //      -> dentro profileScreen viene fatto profileId = props.match.params.profileId
        // In ogni caso, profileId si prende dallo user in localStorage
    }
}

module.exports = withLanguage(MyProfileButton);