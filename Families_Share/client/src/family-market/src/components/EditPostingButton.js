import withLanguage from "../../../components/LanguageContext";

import {withRouter} from "react-router-dom";

import React from "react" ;
import PropTypes from "prop-types";
import {stringify, Log} from "../utils";

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
            <div role="button" className="navBarHeight" onClick={this.redirectToEditPostingScreen}>
                <i className="far fa-edit family-icon" />
            </div>
        )
    }


    /**
     * Called when the button is clicked.
     */
    redirectToEditPostingScreen() {
        const {postingId, onEditRedirection, onDeleteRedirection} = this.props;

        // When the user presses the go back button, it has to be redirected to the
        // previous page, which is the current one.
        // NOTE: this data has to be passed because the redirection to EditPostingScreen
        // is a replace() and not a push(), so history.goBack() doesn't work as intended:
        // the page has to be "manually" replaced.
        const goBackRedirection = {
            pathname: this.props.location.pathname,
            state: this.props.location.state
        };

        const redirectionHandler =
            buildEditModeRedirectionHandler(this.props.history, postingId,
                goBackRedirection, onEditRedirection, onDeleteRedirection);

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
