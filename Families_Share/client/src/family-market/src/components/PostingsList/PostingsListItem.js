
import withLanguage from "../../../../components/LanguageContext";
import Posting from "../../api/model/Posting";
import React from "react";
import PropTypes from "prop-types";
import {Log} from "../../utils";
import ListItem from "../ListItem";
import EditPostingButton from "../EditPostingButton";
import ToggleFavouriteButton from "../ToggleFavouriteButton";
import {buildPostingScreenRedirectionHandler} from "../PostingScreen/PostingScreen";
import {withRouter} from "react-router-dom";


/**
 * Component that represents a posting as an item of a PostingsList.
 * It allows to display various buttons alongside the posting main info,
 * based on the mode that is set when it is instantiated.
 */
class PostingsListItem extends React.Component {

    /**
     * Used to communicate with the server api.
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


        // Display posting info in the list item
        const posting = this.props.posting;

        // To pass as props down to the edit posting button.
        // It is not a problem if we get redirected to the current page,
        // since after an edit or delete the current page will be reloaded and there
        // won't be any inconsistencies (this component will be reloaded along with
        // its parent PostingsList, so no deleted postings or
        // postings with outdated info will be shown)
        const redirection = {
            pathname: this.props.location.pathname,
            state: this.props.location.state
        };

        // Determine which button to display based on the mode of this item
        let sideButton;
        if (this.props.mode === PostingsListItem.EDIT_MODE) {
            // Render edit button
            sideButton = (
                <EditPostingButton postingId={posting.id}
                                   onEditRedirection={redirection}
                                   onDeleteRedirection={redirection}/>
            );
        }
        else if (this.props.mode === PostingsListItem.FAVOURITES_MODE) {
            // Render toggle favourite button
            let theme = "family-icon-dark";
            sideButton = (
                <ToggleFavouriteButton postingId={posting.id} theme={theme}/>
            );
        }
        else {
            Log.error("mode is invalid, the user shouldn't be able to get here");
            sideButton = <h1>Error</h1>;
        }

        return (
            <div role="button" onClick={this.redirectToPostingScreen}>

                <ListItem image={posting.photo}
                          title={posting.name}
                          description={posting.description}
                          sideButton={sideButton}/>

            </div>
        );
    }

    /**
     * Called when this component is clicked.
     * Redirects to PostingScreen, which displays the posting associated with this instance.
     */
    redirectToPostingScreen() {
        const postingId = this.props.posting.id;
        const onDeleteRedirection = {
            pathname: this.props.location.pathname,
            state: this.props.location.state
        };
        const redirectionHandler =
            buildPostingScreenRedirectionHandler(this.props.history, postingId, onDeleteRedirection);

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
    mode: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
};

export const FAVOURITES_MODE = PostingsListItem.FAVOURITES_MODE;
export const EDIT_MODE = PostingsListItem.EDIT_MODE;

export default withRouter(withLanguage(PostingsListItem));
