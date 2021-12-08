const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const EditPostingButton = require("../EditPostingButton");
const ToggleFavouriteButton = require("../ToggleFavouriteButton");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the navigation bar of the posting screen.
 * It has the default go back button, a toggle favourite button and
 * a button to go to the editing/creation screen.
 */
class PostingNavBar extends React.Component {

    /**
     * @type {{isFavourite: boolean}}
     */
    state;

    constructor(props) {
        super(props);

        this.state = {
            isFavourite: xxx //TODO fare metodo isPostingFavourite(userId, postingId) su api
        }

        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {
        // TODO PlainNavBar + EditPostingButton + ToggleFavouriteButton
    }

    /**
     * Returns true if the current user is the owner of the posting that is being displayed,
     * false otherwise.
     * @return {boolean}
     */
    isCurrentUserOwner() {
        const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const postingOwnerId = this.props.posting.id;

        return currentUserId === postingOwnerId;
    }

    async handleFavouriteChange() {
        // TODO add methods (add, remove favourite(userId, postingId)) + add tests
        xxx //TODO fare metodo isPostingFavourite(userId, postingId) su api
    }

}

PostingNavBar.defaultProps = {
    posting: Posting.EMPTY
}

PostingNavBar.propTypes = {
    posting: PropTypes.instanceOf(Posting)
}

module.exports = withLanguage(PostingNavBar);