
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import React from "react";
import PlainNavBar from "../PlainNavBar";
import MyProfileButton from "./MyProfileButton";
import GuideButton from "./GuideButton";
import PropTypes from "prop-types";


/**
 * Class that represents the navigation bar of the marketplace screen.
 * It has the default go back button and a button to go to the profile section.
 */
class MarketplaceNavBar extends React.Component {

    render() {
        const language = this.props.language;
        const txt = texts[language].marketplaceScreen;

        return (

            <div>
                <PlainNavBar title={txt.title} otherComponent={<MyProfileButton/>} otherComponent2={<GuideButton/>} />
            </div>

        );
    }
}

MarketplaceNavBar.propTypes = {
    language: PropTypes.string
}

export default withLanguage(MarketplaceNavBar);
