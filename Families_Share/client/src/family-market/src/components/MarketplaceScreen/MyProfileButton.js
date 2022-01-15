
import withLanguage from "../../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types";
import {Log} from "../../utils";
import {withRouter} from "react-router-dom";
import IconItem from "../IconItem";

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

        return (
            <div role="button" className="navBarHeight" onClick={this.redirectToProfileScreen}>
                <IconItem iconPath="fas fa-user" theme="family-icon"/>
            </div>
        )
    }


    /**
     * Called when the button is clicked.
     */
    redirectToProfileScreen() {
        // Line 132 MyFamiliesShareHeader.js: "/profiles/${userId}/info"
        const profileId = JSON.parse(localStorage.getItem("user")).id;
        const profileScreenUrl = `/profiles/${profileId}/info`;

        Log.info("Redirecting to ProfileScreen " + profileScreenUrl, this);
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
