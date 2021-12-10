import withLanguage from "../../../../components/LanguageContext";
import {withRouter} from "react-router-dom";

const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");
const {buildCreateModeRedirectionHandler} = require( "../EditPostingScreen/EditPostingScreen");

const texts = require("../../texts");



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
            <button onClick={this.redirectToEditPostingScreen}>
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
        const toCreateScreenUrl = this.props.toCreateScreenUrl;

        const redirectionHandler =
            buildCreateModeRedirectionHandler(this.props.history, userId, groupId, toCreateScreenUrl);

        redirectionHandler();
    }
}

CreatePostingButton.propTypes = {
    /**
     * Url to redirect to when the button is clicked
     */
    toCreateScreenUrl: PropTypes.string.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withRouter(withLanguage(CreatePostingButton));