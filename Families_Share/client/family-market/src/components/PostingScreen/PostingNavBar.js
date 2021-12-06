const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const EditPostingButton = require("../EditPostingButton");
const ToggleFavouriteButton = require("../ToggleFavouriteButton");


/**
 * Class that represents the navigation bar of the posting screen.
 * It has the default go back button, a toggle favourite button and
 * a button to go to the editing/creation screen.
 */
class PostingNavBar extends React.Component {

    /**
     * @type {{isOwner: boolean, posting: Posting}}
     */
    props;

    /**
     *
     * @param props {{isOwner: boolean, posting: Posting}}
     */
    constructor(props) {
        super(props);

        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {
        // TODO PlainNavBar + EditPostingButton + ToggleFavouriteButton
    }

    handleFavouriteChange() {

    }
}

module.exports = PostingNavBar;