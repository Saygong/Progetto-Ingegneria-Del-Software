import withLanguage from "../../../components/LanguageContext";

import {withRouter} from "react-router-dom";

import React from "react" ;
import PropTypes from "prop-types";
import Log from "../../../components/Log";

import {buildEditModeRedirectionHandler} from "./EditPostingScreen/EditPostingScreen";

import texts from"../texts";


/**
 * Class that represents an edit button, used to edit a posting.
 * When clicked, it redirects to an EditPostingScreen that gets loaded
 * with the posting that needs to be edited.
 */
class EditPostingButton extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToEditPostingScreen = this.redirectToEditPostingScreen.bind(this);
    }

    render() {
        return (
            <button onClick={this.redirectToEditPostingScreen}>
                <i className="far fa-edit" />
            </button>
        )
    }


    /**
     * Called when the button is clicked.
     */
    redirectToEditPostingScreen() {
        const {postingId, onEditRedirection, onDeleteRedirection} = this.props;
        const redirectionHandler =
            buildEditModeRedirectionHandler(this.props.history, postingId,
                onEditRedirection, onDeleteRedirection);

        Log.info("Redirecting to EditPostingScreen ", this);
        redirectionHandler();
    }
}

EditPostingButton.propTypes = {
    /**
     * Id of the posting to edit.
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Id to redirect to when the edit is confirmed.
     * Needs to have a pathname and a state property.
     */
    onEditRedirection: PropTypes.object.isRequired,

    /**
     * Id to redirect to if the posting is deleted.
     * Needs to have a pathname and a state property.
     */
    onDeleteRedirection: PropTypes.object.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withRouter(withLanguage(EditPostingButton));
