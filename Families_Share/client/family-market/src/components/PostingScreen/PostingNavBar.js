const ApiHandler = require("../../api/ApiHandler");
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

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.state = {
            isFavourite: false
        };

        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {
        // TODO PlainNavBar + EditPostingButton + ToggleFavouriteButton
    }

    async componentDidMount() {
        // Fetch the favourite state and set it
        const currentPosting = this.props.posting;
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const isFav = await this.apiHandler.isUserFavourite(userId, currentPosting.id);

        this.setState({
            isFavourite: isFav
        });

        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
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

    /**
     * Called when the button is clicked.
     * Changes the button state and adds/removes the current posting to/from the user's favourites.
     * @return {Promise<void>}
     */
    async handleFavouriteChange() {
        // since the button has been clicked, the state needs to be toggled
        const newIsFav = !this.state.isFavourite;
        const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const posting = this.props.posting;
        if (newIsFav) {
            await this.apiHandler.addUserFavourite(currentUserId, posting.id);
        }
        else {
            await this.apiHandler.removeUserFavourite(currentUserId, posting.id);
        }

        this.setState({
            isFavourite: newIsFav
        });
    }
}

PostingNavBar.defaultProps = {
    posting: Posting.EMPTY
}

PostingNavBar.propTypes = {
    posting: PropTypes.instanceOf(Posting).isRequired
}

module.exports = withLanguage(PostingNavBar);