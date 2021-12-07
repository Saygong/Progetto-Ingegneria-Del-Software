const Posting = require("../api/model/Posting");

const React = require("react");
import PropTypes from "prop-types";
const Log = require("../../../src/components/Log");
const {EDIT_POSTING_SCREEN_URL} = require( "../constants");
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

    redirectToEditPostingScreen() {
        Log.info("Redirecting to EditPostingScreen " + `(${EDIT_POSTING_SCREEN_URL})`, this);

        const userId = JSON.parse(localStorage.getItem("user")).id;
        this.props.history.push({
            pathname: EDIT_POSTING_SCREEN_URL,
            state: {
                isCreateMode: false,
                userId: userId,
                posting: this.props.posting
            }
        });
    }
}

// TODO
EditPostingButton.defaultProps = {
    posting: Posting.EMPTY
}

EditPostingButton.propTypes = {
    posting: PropTypes.instanceOf(Posting)
}

module.exports = withRouter(withLanguage(EditPostingButton));