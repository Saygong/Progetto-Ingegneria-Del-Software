<<<<<<< HEAD:Families_Share/client/family-market/src/components/EntryPoint/AccessMarketplaceButton.js
import withLanguage from "../../../../src/components/LanguageContext";
=======
import withLanguage from "../../../../components/LanguageContext";
>>>>>>> testing:Families_Share/client/src/family-market/src/components/EntryPoint/AccessMarketplaceButton.js

const React = require("react");
const PropTypes =  require("prop-types");
const Log = require("../../../../components/Log");
const ListItem = require("../ListItem");
const {buildRedirectionHandler} = require("../MarketplaceScreen/MarketplaceScreen");
const texts = require("../../texts");
<<<<<<< HEAD:Families_Share/client/family-market/src/components/EntryPoint/AccessMarketplaceButton.js
const {withRouter} = require("react-router-dom");
=======

>>>>>>> testing:Families_Share/client/src/family-market/src/components/EntryPoint/AccessMarketplaceButton.js


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
        // TODO add image
        const marketplaceIconPath = "";

        return (
            <div role="button" onClick={this.redirectToMarketplaceScreen}>
                <ListItem image={marketplaceIconPath} title={txt.title} description={txt.description}/>
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