import withLanguage from "../../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import PlainNavBar from "../PlainNavBar";
import EditPostingButton from "../EditPostingButton";
import ToggleFavouriteButton from "../ToggleFavouriteButton";
import MarketplaceScreen from "../MarketplaceScreen/MarketplaceScreen";



/**
 * Class that represents the navigation bar of the posting screen.
 * It has the default go back button, a toggle favourite button and
 * a button to go to the editing/creation screen.
 */
class PostingNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const postingTitle = this.props.postingName;
        let otherComp;
        if(this.isCurrentUserOwner()){
            otherComp = <EditPostingButton postingId={this.props.postingId}
                                           onEditRedirection={this.props.onEditRedirection}
                                           onDeleteRedirection={this.props.onDeleteRedirection} />;
        }
        else{
            let theme = "family-icon";
            otherComp = <ToggleFavouriteButton postingId={this.props.postingId} theme={theme}/>;
        }

        return (
            <div>
                <PlainNavBar title={postingTitle} otherComponent={otherComp}/>
            </div>
        );
    }

    /**
     * Returns true if the current user is the owner of the posting that is being displayed,
     * false otherwise.
     * @return {boolean}
     */
    isCurrentUserOwner() {
        const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const postingCreatorId = this.props.postingCreatorId;

        return currentUserId === postingCreatorId;
    }
}

PostingNavBar.propTypes = {
    /**
     * Passed as prop to the favourite and edit button.
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Name of the posting, which is displayed as title.
     */
    postingName: PropTypes.string.isRequired,

    /**
     * Id of the user that created the posting.
     * Used to determine if the current user is the owner of the posting and
     * consequently which buttons to show .
     */
    postingCreatorId: PropTypes.string.isRequired,

    /**
     * Url needed for EditPostingButton and, consequently, EditPostingScreen.
     * It represents the page to redirect to after the user deletes a posting.
     * Needs to have a pathname and a state property.
     */
    onDeleteRedirection: PropTypes.object.isRequired,

    /**
     * Url needed for EditPostingButton and, consequently, EditPostingScreen.
     * It represents the page to redirect to after the user edits a posting.
     * Needs to have a pathname and a state property.
     */
    onEditRedirection: PropTypes.object.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
};

export default withLanguage(PostingNavBar);
