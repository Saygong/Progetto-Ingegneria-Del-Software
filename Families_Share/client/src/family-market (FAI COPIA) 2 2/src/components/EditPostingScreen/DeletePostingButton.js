const ApiHandler = require("../../api/ApiHandler");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");

const texts = require("../../texts");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents a button used to delete something.
 */
class DeletePostingButton extends React.Component {

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        // TODO (magari aggiungere pure una finestra di dialogo per dire "sei sicuro"?
        const language = this.props.language;
        const buttonText = texts[language].deletePostingButton.text;

        return (
            <button onClick={this.handleClick} style="height:200px;width:200px">
                {buttonText}
            </button>
        )
    }

    /**
     * Called when the button is clicked.
     * Deletes the posting and calls the redirection handler passed as prop.
     * @return {Promise<void>}
     */
    async handleClick() {
        await this.handleDelete();
        this.props.redirectionHandler();
    }

    /**
     * Deletes the posting specified in the props.
     * @return {Promise<void>}
     */
    async handleDelete() {
        // Delete the posting by calling api
        const postingId = this.props.postingId;
        await this.apiHandler.deletePosting(postingId);
    }
}

DeletePostingButton.propTypes = {
    /**
     * Id of the posting to delete if the button is pressed.
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Function that handles the redirection after the posting has been deleted
     */
    redirectionHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(DeletePostingButton);