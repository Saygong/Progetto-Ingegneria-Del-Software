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

ConfirmButton.defaultProps = {
    confirmationHandler: null
}

ConfirmButton.propTypes = {
    confirmationHandler: PropTypes.func.isRequired
}

module.exports = withLanguage(ConfirmButton);