const React = require("react");
const Log = require("../../../src/components/Log");


/**
 * Class that represents a toggleable button that changes the "favourite" state of something.
 */
class ToggleFavouriteButton extends React.Component {

    /**
     * @type {{isFavourite: boolean, favouriteChangeHandler: function}}
     */
    props;

    /**
     *
     * @param props {{isFavourite: boolean, favouriteChangeHandler: function}}
     */
    constructor(props) {
        super(props);

        this.isFavouriteImage = "";
        this.notFavouriteImage = "";

        this.onClick = this.onClick.bind(this);
    }

    render() {
        // TODO: change the displayed image based on the isFavourite prop
    }

    async onClick() {
        // TODO call favouriteChangeHandler
    }
}

module.exports = ToggleFavouriteButton;