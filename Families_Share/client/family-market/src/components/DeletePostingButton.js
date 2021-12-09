const ApiHandler = require("../api/ApiHandler");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";


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
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        // TODO (magari aggiungere pure una finestra di dialogo per dire "sei sicuro"?
    }

    async handleDelete() {
        // Delete the posting by calling api
    }
}

DeletePostingButton.defaultProps = {
    postingId: "",
    redirectionHandler: () => {}
}

DeletePostingButton.propTypes = {
    /**
     * Id of the posting to delete if the button is pressed.
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Function that handles the redirection after the posting has been deleted
     */
    redirectionHandler: PropTypes.func
}

module.exports = withLanguage(DeletePostingButton);