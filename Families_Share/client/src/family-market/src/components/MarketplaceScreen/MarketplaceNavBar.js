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

            <div className="w-100 mx-auto family-color">
                <table className="w-100 mx-auto">
                    <tr>
                        <td className="w-80">
                            <PlainNavBar title={txt.title}/>
                        </td>

                        <td className="w-10">
                           <MyProfileButton />
                        </td>

                    </tr>
                </table>
            </div>

        );
    }

}

export default withLanguage(MarketplaceNavBar);
