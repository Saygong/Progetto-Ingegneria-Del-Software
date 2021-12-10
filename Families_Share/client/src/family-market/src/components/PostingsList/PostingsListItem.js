import withLanguage from "../../../../components/LanguageContext";

const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");
const ListItem = require("../ListItem");
const EditPostingButton = require("../EditPostingButton");
const ToggleFavouriteButton = require("../ToggleFavouriteButton");

const {buildRedirectionHandler} = require("../PostingScreen/PostingScreen")
const {withRouter} = require("react-router-dom");

const texts = require("../../texts");


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

        this.redirectToPostingScreen = this.redirectToPostingScreen.bind(this);
    }

    render() {
        // Get the texts based on the current language TODO forse non serve
        //const language = this.props.language;
        //const txt = texts[language].confirmButton;

        // Display posting info in the list item
        const posting = this.props.posting;

        // To pass as props down to the edit posting button.
        // It is not a problem if we get redirected to the current page,
        // since after an edit or delete the current page will be reloaded and there
        // won't be any inconsistencies (this component will be reloaded along with
        // its parent PostingsList, so no deleted postings or
        // postings with outdated info will be shown)
        const redirectToUrl = this.props.location.pathname;

        // Determine which button to display based on the mode of this item
        let sideButton;
        if (this.props.mode === PostingsListItem.EDIT_MODE) {
            // Render edit button
            sideButton = (
                <EditPostingButton postingId={posting.id}
                                   onEditUrl={redirectToUrl} onDeleteUrl={redirectToUrl}/>
            );
        }
        else if (this.props.mode === PostingsListItem.FAVOURITES_MODE) {
            // Render toggle favourite button
            sideButton = (
                <ToggleFavouriteButton postingId={posting.id}/>
            );
        }
        else {
            Log.error("mode is invalid, the user shouldn't be able to get here");
            sideButton = <h1>Error</h1>;
        }

        return (
            <div className="row no-gutters">
                <div className="col-8-10">
                    <ListItem image={posting.photo}
                              title={posting.name}
                              description={posting.description}/>
                </div>
                <div className="col-2-10">
                    {sideButton}
                </div>
            </div>
        );
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
