import withLanguage from "../../../../components/LanguageContext";

import React from "react";
import Log from "../../../../components/Log";
import PlainNavBar from "../PlainNavBar";
import MyProfileButton from "./MyProfileButton";
import texts from "../../texts";


/**
 * Class that represents the navigation bar of the marketplace screen.
 * It has the default go back button and a button to go to the profile section.
 */
class MarketplaceNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].marketplaceScreen;

        return (
            <div className="mx-auto">
                <div className="mx-auto">
                    <PlainNavBar title={txt.title} goBackUrl={""} /> {/*TODO che url?*/}
                    <MyProfileButton/>
                </div>
            </div>
        );
    }

}

export default withLanguage(MarketplaceNavBar);
