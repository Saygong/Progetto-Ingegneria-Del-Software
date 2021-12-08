const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const MyProfileButton = require("MyProfileButton");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the navigation bar of the marketplace screen.
 * It has the default go back button and a button to go to the profile section.
 */
class MarketplaceNavBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        // TODO PlainNavBar + MyProfileButton
    }
}

module.exports = withLanguage(MarketplaceNavBar);