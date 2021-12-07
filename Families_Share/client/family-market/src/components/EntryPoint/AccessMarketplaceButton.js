const React = require("react");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const {buildRedirectionHandler} = require("../MarketplaceScreen/MarketplaceScreen");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the button to access the Marketplace section of Family Market.
 * It is the entry point to the extension.
 *
 * TODO This button must be added to the GroupActivities component (see TODO)
 */
class AccessMarketplaceButton extends React.Component {
    constructor(props) {
        super(props);

        // TODO these values are constant since the button is always the same
        this.image = "";
        this.title = "";
        this.description = "";

        this.redirectToMarketplaceScreen = this.redirectToMarketplaceScreen.bind(this);
    }

    render() {
        // TODO this button is a ListItem
    }

    redirectToMarketplaceScreen() {
        const redirectionHandler = buildRedirectionHandler(this.props.history);

        Log.info("Redirecting to MarketplaceScreen ", this);

        redirectionHandler();
    }
}

module.exports = withRouter(withLanguage(AccessMarketplaceButton));