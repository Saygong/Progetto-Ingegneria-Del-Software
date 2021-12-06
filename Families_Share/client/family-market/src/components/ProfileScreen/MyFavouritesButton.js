const React = require("react");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const MyFavouritesScreen = require("../MyFavouritesScreen/MyFavouritesScreen");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the button to access the "my favourites" screen.
 *
 * TODO This button must be added to the ProfileScreen component
 */
class MyFavouritesButton extends React.Component {
    constructor(props) {
        super(props);

        // TODO these values are constant since the button is always the same
        this.image = "";
        this.title = "";
        this.description = "";

        this.onClick = this.onClick.bind(this);
    }

    render() {
        // TODO this button is a ListItem
    }

    onClick() {
        // TODO send to MyFavouritesScreen
    }
}

module.exports = withLanguage(MyFavouritesButton);