
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import React from "react";
import PropTypes from  "prop-types";
import {Log} from "../../utils";
import {buildRedirectionHandler} from "../MarketplaceScreen/MarketplaceScreen";
import {withRouter} from "react-router-dom";
import MenuItem from "../MenuItem";

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
            <div className="w-100 " role="button" onClick={this.redirectToMarketplaceScreen} >
                <div className="horizontalCenter">
                    <h3 className="">{txt.header}</h3>
                </div>
                <MenuItem path="fas fa-balance-scale" title={txt.title} description={txt.description} />
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
    language: PropTypes.string,

}



export default withRouter(withLanguage(AccessMarketplaceButton));
