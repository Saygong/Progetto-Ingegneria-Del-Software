const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";


/**
 * Class that represents a toggleable button that changes the "favourite" state of something.
 */
class ToggleFavouriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.isFavouriteImage = "";
        this.notFavouriteImage = "";

        this.handleToggle = this.handleToggle.bind(this);
    }

    render() {
        // TODO: change the displayed image based on the isFavourite prop
    }

    /**
     * Called when the button is pressed, which causes the state to toggle.
     * @return {Promise<void>}
     */
    async handleToggle() {
        const newState = !this.props.isFavourite;
        this.props.favouriteChangeHandler(newState)
    }
}

ToggleFavouriteButton.defaultProps = {
    isFavourite: false,
    favouriteChangeHandler: null
}

ToggleFavouriteButton.propTypes = {
    isFavourite: PropTypes.bool.isRequired,
    favouriteChangeHandler: PropTypes.func.isRequired
}

module.exports = withLanguage(ToggleFavouriteButton);