import {withRouter} from "react-router-dom";
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import Posting from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import {buildCreateModeRedirectionHandler} from "../EditPostingScreen/EditPostingScreen";




/**
 * Class that represents a button used to create a posting.
 * When clicked, it redirects to an empty EditPostingScreen that is used
 * to create a new posting.
 */
class CreatePostingButton extends React.Component {

    constructor(props) {
        super(props);

        this.redirectToEditPostingScreen = this.redirectToEditPostingScreen.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].createPostingButton;

        return (
            <button className="buttonCreatePosting" onClick={this.redirectToEditPostingScreen}>
                {txt.text}
            </button>
        )
    }

    /**
     * Called when the button is clicked.
     */
    redirectToEditPostingScreen() {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const groupId = JSON.parse(localStorage.getItem("group")).id;
        const goBackRedirection = {
            pathname: this.props.location.pathname,
            state: this.props.location.state
        };
        const onCreateRedirection = this.props.onCreateRedirection;

        const redirectionHandler =
            buildCreateModeRedirectionHandler(this.props.history, userId, groupId,
                goBackRedirection, onCreateRedirection);

        redirectionHandler();
    }
}

CreatePostingButton.propTypes = {
    /**
     * Location to redirect to after the posting is created.
     * Needs to have a pathname and a state property.
     */
    onCreateRedirection: PropTypes.object.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withRouter(withLanguage(CreatePostingButton));
