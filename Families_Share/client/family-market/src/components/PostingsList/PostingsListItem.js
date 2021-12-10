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

        this.redirectToPostingScreen = this.redirectToPostingScreen.bind(this);
    }

    render() {
        // TODO
        if (this.props.mode === PostingsListItem.EDIT_MODE) {
            // render edit button
        }
        else if (this.props.mode === PostingsListItem.FAVOURITES_MODE) {
            // render toggle favourite button
        }
        else {
            Log.error("mode is invalid, the user shouldn't be able to get here");
            return (
                <div>Error</div>
            )
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
}

PostingsListItem.defaultProps = {
    posting: Posting.EMPTY,
    mode: PostingsListItem.FAVOURITES_MODE
};

PostingsListItem.propTypes = {
    /**
     * Posting to display
     */
    posting: PropTypes.instanceOf(Posting),

    /**
     * Determines if the favourite or the edit button is displayed
     */
    mode: PropTypes.oneOf(
        [PostingsListItem.EDIT_MODE, PostingsListItem.FAVOURITES_MODE]),

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
};

module.exports = {
    PostingsListItem: withRouter(withLanguage(PostingsListItem)),
    FAVOURITES_MODE: PostingsListItem.FAVOURITES_MODE,
    EDIT_MODE: PostingsListItem.EDIT_MODE
};
