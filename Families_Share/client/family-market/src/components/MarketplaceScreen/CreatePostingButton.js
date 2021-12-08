const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const {buildCreateModeRedirectionHandler} = require( "../EditPostingScreen/EditPostingScreen");
import {withRouter} from "react-router-dom";
import withLanguage from "../../../../src/components/LanguageContext";


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
        // TODO
    }

    /**
     * Called when the button is clicked.
     */
    redirectToEditPostingScreen() {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const groupId = JSON.parse(localStorage.getItem("group")).id;
        const onCreateUrl = this.props.onCreateUrl;

        const redirectionHandler =
            buildCreateModeRedirectionHandler(this.props.history, userId, groupId, onCreateUrl);

        redirectionHandler();
    }
}

CreatePostingButton.defaultProps = {
    onCreateUrl: null
}

CreatePostingButton.propTypes = {
    onCreateUrl: PropTypes.string.isRequired
}

module.exports = withRouter(withLanguage(CreatePostingButton));