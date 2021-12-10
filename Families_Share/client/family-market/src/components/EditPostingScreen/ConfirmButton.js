const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents a button that is pressed to confirm a certain action.
 */
class ConfirmButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    render() {
        // TODO:
    }

    /**
     * Called when the button is pressed.
     * @return {Promise<void>}
     */
    async handleConfirmation() {
        this.props.confirmationHandler();
    }

}

ConfirmButton.propTypes = {
    /**
     * Function that handles what happens when this button is pressed
     */
    confirmationHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(ConfirmButton);