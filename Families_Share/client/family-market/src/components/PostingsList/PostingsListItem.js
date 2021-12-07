const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const EditPostingButton = require("../EditPostingButton");
const DeletePostingButton = require("../DeleteButton");
const ToggleFavouriteButton = require("../ToggleFavouriteButton");
const {POSTING_SCREEN_URL} = require("../../constants");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Component that represents a posting as an item of a PostingsList.
 * It allows to display various buttons alongside the posting main info,
 * based on the mode that is set when it is instantiated.
 */
class PostingsListItem extends React.Component {
    /**
     * Changed by the toggle favourite button
     * @type {{isFavourite: boolean}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     * String that needs to be passed as prop in order to set the item on edit mode
     * @return {string}
     */
    static get EDIT_MODE() {
        return "edit";
    }

    /**
     * String that needs to be passed as prop in order to set the item on edit mode
     * @return {string}
     */
    static get FAVOURITES_MODE() {
        return "favourites";
    }

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.state = {
            isFavourite: false
        }

        this.redirectToPostingScreen = this.redirectToPostingScreen.bind(this);
        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {
        // TODO
        if (this.props.mode === PostingsListItem.EDIT_MODE) {
            // render edit and delete buttons
        }
        else if (this.props.mode === PostingsListItem.FAVOURITES_MODE) {
            // render toggle favourite button
            // this.state.isFavourite is passed onto the button
        }
        else {

        }
    }

    /**
     * Called when this component is clicked.
     */
    redirectToPostingScreen() {
        Log.info("Redirecting to PostingScreen " + `(${POSTING_SCREEN_URL})`, this);

        const currentPosting = this.props.posting;
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const isOwner = userId === currentPosting.user_id;

        this.props.history.push({
            pathname: POSTING_SCREEN_URL,
            state: {
                isOwner: isOwner,
                posting: currentPosting
            }
        })
    }

    async handleFavouriteChange() {
        // TODO updates the current user favourites list and change state
    }
}


PostingsListItem.defaultProps = {
    posting: Posting.EMPTY,
    mode: PostingsListItem.FAVOURITES_MODE,
    deletionHandler: null
}

PostingsListItem.propTypes = {
    posting: PropTypes.instanceOf(Posting),
    mode: PropTypes.string,
    deletionHandler: PropTypes.func.isRequired
}

module.exports = withRouter(withLanguage(PostingsListItem));