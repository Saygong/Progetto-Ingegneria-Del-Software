import texts from "../../texts";
import withLanguage from "../../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import {withRouter} from "react-router-dom";

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
        const language = this.props.language;
        const txt = texts[language].profileButton;

        return (
            <div className="w-100">
                <div className="w-20 text-center" role="button" onClick={this.redirectToProfileScreen}>
                    <i className="family-icon fas fa-user whity" />
                </div>
            </div>

        )
    }

    /**
     * Called when the button is clicked.
     */
    redirectToProfileScreen() {
        // Line 322 App.js: path="/profiles/:profileId"
        const profileId = JSON.parse(localStorage.getItem("user")).id;
        const profileScreenUrl = `/profiles/${profileId}`;

        Log.info("Redirecting to ProfileScreen " + `(${profileScreenUrl})`, this);
        this.props.history.push(profileScreenUrl);
    }
}

MyProfileButton.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withRouter(withLanguage(MyProfileButton));
