const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const EditPostingButton = require("../EditPostingButton");
const ToggleFavouriteButton = require("../ToggleFavouriteButton");
const {buildRedirectionHandler} = require("../PostingScreen/PostingScreen")
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
            isFavourite: false // TODO da togliere perché viene spostato dentro favourite button
        }

        this.redirectToPostingScreen = this.redirectToPostingScreen.bind(this);
        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {
        // TODO
        if (this.props.mode === PostingsListItem.EDIT_MODE) {
            // render edit button
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
        const postingId = this.props.posting.id;
        const redirectionHandler = buildRedirectionHandler(this.props.history, postingId)

        Log.info("Redirecting to PostingScreen ", this);
        redirectionHandler();
    }

    async handleFavouriteChange() {
        // TODO add this method (implemented in posting nav bar) inside the button
        // TODO 2 do the same for the delete button. Make them implement the method instead of
        //      accepting a handler.
    }
}


PostingsListItem.defaultProps = {
    posting: Posting.EMPTY,
    mode: PostingsListItem.FAVOURITES_MODE
}

PostingsListItem.propTypes = {
    /**
     * Posting to display
     */
    posting: PropTypes.instanceOf(Posting),

    /**
     * Determines if the favourite or the edit button is displayed
     */
    mode: PropTypes.oneOf([PostingsListItem.EDIT_MODE, PostingsListItem.FAVOURITES_MODE])
}

module.exports = {
    PostingsListItem: withRouter(withLanguage(PostingsListItem)),
    FAVOURITES_MODE: PostingsListItem.FAVOURITES_MODE,
    EDIT_MODE: PostingsListItem.EDIT_MODE
};
