import withLanguage from "../../../../components/LanguageContext";

const React = require("react");
const Log = require("../../../../components/Log");
const PlainNavBar = require("../PlainNavBar");
const MyProfileButton = require("./MyProfileButton");



/**
 * Class that represents the navigation bar of the marketplace screen.
 * It has the default go back button and a button to go to the profile section.
 */
class MarketplaceNavBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return;
        // TODO PlainNavBar + MyProfileButton
    }
}

export default withLanguage(MarketplaceNavBar);