const React = require("react");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const MarketplaceScreen = require("../MarketplaceScreen/MarketplaceScreen");
const {MARKETPLACE_SCREEN_URL} = require("../../constants");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the button to access the Marketplace section of Family Market.
 * It is the entry point to the extension.
 *
 * TODO This button must be added to the ActivityList component
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
        Log.info("Redirecting to MarketplaceScreen " + `(${MARKETPLACE_SCREEN_URL})`, this);

        this.props.history.push(MARKETPLACE_SCREEN_URL);
    }
}

module.exports = withRouter(withLanguage(AccessMarketplaceButton));