const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
const {EDIT_POSTING_SCREEN_URL} = require( "../../constants");
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
        Log.info("Redirecting to EditPostingScreen " + `(${EDIT_POSTING_SCREEN_URL})`, this);

        const userId = JSON.parse(localStorage.getItem("user")).id;

        // The screen is loaded in creation mode, which means createMode = true and
        // an empty posting is passed.
        this.props.history.push({
            pathname: EDIT_POSTING_SCREEN_URL,
            state: {
                isCreateMode: true,
                userId: userId,
                posting: Posting.EMPTY
            }
        });
    }
}

module.exports = withRouter(withLanguage(CreatePostingButton));