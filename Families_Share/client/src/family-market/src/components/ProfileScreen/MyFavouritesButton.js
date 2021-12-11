import withLanguage from "../../../../components/LanguageContext";

const PropTypes = require("prop-types");

const React = require("react");
const Log = require("../../../../components/Log");
const ListItem = require("../ListItem");
const {buildRedirectionHandler} = require("../MyFavouritesScreen/MyFavouritesScreen");
const {withRouter} = require("react-router-dom");


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

        this.redirectToMyFavouritesScreen = this.redirectToMyFavouritesScreen.bind(this);
    }

    render() {
        return (
            <div>

            </div>
        );
        // TODO this button is a ListItem
    }

    /**
     * Called when this button is clicked.
     */
    redirectToMyFavouritesScreen() {
        const redirectionHandler = buildRedirectionHandler(this.props.history);

        Log.info("Redirecting to MyFavouritesScreen ", this);

        redirectionHandler();
    }
}

MyFavouritesButton.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withRouter(withLanguage(MyFavouritesButton));
