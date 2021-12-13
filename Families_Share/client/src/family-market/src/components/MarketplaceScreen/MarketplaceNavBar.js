import withLanguage from "../../../../components/LanguageContext";

import React from "react";
import Log from "../../../../components/Log";
import PlainNavBar from "../PlainNavBar";
import MyProfileButton from "./MyProfileButton";


/**
 * Class that represents the navigation bar of the marketplace screen.
 * It has the default go back button and a button to go to the profile section.
 */
class MarketplaceNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const marketplaceTitle = this.props.name;

        return (
            <div className="col no-gutters">
                <div className="col-8-10">
                    <PlainNavBar title={marketplaceTitle} goBackUrl={""} /> {/*TODO che url?*/}
                </div>
                <div className="col-2-10">
                    <MyProfileButton/>
                </div>
            </div>
        );
    }

}

export default withLanguage(MarketplaceNavBar);
