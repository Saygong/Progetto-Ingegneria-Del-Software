const React = require("react");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const MarketplaceScreen = require("../MarketplaceScreen/MarketplaceScreen");


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
        // TODO send to MarketplaceScreen
    }
}

module.exports = AccessMarketplaceButton;