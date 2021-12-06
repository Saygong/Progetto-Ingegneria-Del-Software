const React = require("react");
const Log = require("../../../src/components/Log");


/**
 * Class that represents a toggleable button that changes the "favourite" state of something.
 */
class ToggleFavouriteButton extends React.Component {

    /**
     * @type {{isFavourite: boolean, favouriteChangeHandler: function(boolean)}}
     */
    props;

    /**
     *
     * @param props {{isFavourite: boolean, favouriteChangeHandler: function(boolean)}}
     */
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

module.exports = ToggleFavouriteButton;