import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import React from "react";

import PropTypes from  "prop-types";
import Log from "../../../../components/Log";
import ListItem from "../ListItem";
import {buildRedirectionHandler} from "../MarketplaceScreen/MarketplaceScreen";
import {withRouter} from "react-router-dom";

/**
 * Class that represents the button to access the Marketplace section of Family Market.
 * It is the entry point to the extension.
 *
 * TODO This button must be added to the GroupActivities component (see TODO)
 */
class AccessMarketplaceButton extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToMarketplaceScreen = this.redirectToMarketplaceScreen.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].accessMarketplaceButton;
        // TODO rifare con ListItem??

        return (
            <div>
                <div role="button" onClick={this.redirectToMarketplaceScreen} className="mx-auto w-40">
                    <table className="w-50 mx-auto">
                        <tr>
                            <td >
                                <div className="w-50 text-center">
                                    <h5>Marketplace:</h5>
                                </div>
                            </td>

                            <td >
                                <div className="pr-0">
                                    <i class="family-icon" className="fas fa-balance-scale" />
                                </div>
                            </td>
                            <td >
                                <div className="">
                                    <h2 className="font-italic">{txt.title}</h2>
                                    <h5>{txt.description}</h5>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }

    /**
     * Called when this button is clicked.
     */
    redirectToMarketplaceScreen() {
        const redirectionHandler = buildRedirectionHandler(this.props.history);

        Log.info("Redirecting to MarketplaceScreen ", this);
        redirectionHandler();
    }
}

AccessMarketplaceButton.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withRouter(withLanguage(AccessMarketplaceButton));
