const Posting = require("../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");

const {buildEditModeRedirectionHandler} = require("EditPostingScreen/EditPostingScreen");
import {withRouter} from "react-router-dom";

const texts = require("../texts");
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
        const language = this.props.language;
        const txt = texts[language].editPostingButton;

        return (
            <button>
                <img src="../../assets/edit-icon.png" alt={txt.altImageText}
                     width={200} height={200}
                     onClick={this.redirectToEditPostingScreen}/>
            </button>
        )
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
    /**
     * Id of the posting to edit.
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Id to redirect to when the edit is confirmed.
     */
    onEditUrl: PropTypes.string.isRequired,

    /**
     * Id to redirect to if the posting is deleted.
     */
    onDeleteUrl: PropTypes.string.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withRouter(withLanguage(EditPostingButton));