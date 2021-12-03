const React = require("react");
const Log = require("../../../src/components/Log");


/**
 * Class that represents a toggleable button that changes the state of something
 * (in this case the if a posting is marked as favourite or not) based on the provided handler.
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
    }

    render() {
        // TODO: change the displayed image based on the isFavourite prop
    }

}

module.exports = ToggleFavouriteButton;