import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import React from "react";

import PropTypes from  "prop-types";
import {stringify, Log} from "../../utils";
import {buildRedirectionHandler} from "../MarketplaceScreen/MarketplaceScreen";
import {withRouter} from "react-router-dom";

/**
 * Class that represents the button to access the Marketplace section of Family Market.
 * It is the entry point to the extension.
 *
 */
class AccessMarketplaceButton extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToMarketplaceScreen = this.redirectToMarketplaceScreen.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].accessMarketplaceButton;


        return (
            <div className="w-100">
                <div role="button" onClick={this.redirectToMarketplaceScreen} >

                    <div id="groupMarketPlaceButtonContainer" className="horizontalCenter">
                        <h3 className="">{txt.header}</h3>
                    </div>

                    <div className="row no-gutters">
                        <div className="col-3-10 text-center">
                            <i className="family-icon fas fa-balance-scale verticalCenter"/>
                        </div>
                        <div className="col-7-10 margin-">
                            <h2 className="font-italic">{txt.title}</h2>
                            <h5>{txt.description}</h5>
                        </div>
                    </div>

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
