const Posting = require("../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");

const {buildEditModeRedirectionHandler} = require("EditPostingScreen/EditPostingScreen");

import {withRouter} from "react-router-dom";
import withLanguage from "../../../src/components/LanguageContext";


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
        //TODO
    }

    /**
     * Called when the button is clicked.
     */
    redirectToEditPostingScreen() {
        const {postingId, onEditUrl, onDeleteUrl} = this.props;
        const redirectionHandler =
            buildEditModeRedirectionHandler(this.props.history, postingId, onEditUrl, onDeleteUrl);

        Log.info("Redirecting to EditPostingScreen ", this);

        redirectionHandler();
    }
}

EditPostingButton.propTypes = {
    postingId: PropTypes.string.isRequired,
    onEditUrl: PropTypes.string.isRequired,
    onDeleteUrl: PropTypes.string.isRequired,
}

module.exports = withRouter(withLanguage(EditPostingButton));