import texts from "../../texts";
import withLanguage from "../../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");



/**
 * Class that represents a button that is pressed to confirm a certain action.
 */
class ConfirmButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].confirmButton;

        return (
            <button onClick={this.handleConfirmation}>
                {txt.text}
            </button>
        );
    }

    /**
     * Called when the button is pressed.
     * @return {Promise<void>}
     */
    async handleConfirmation() {
        return this.props.confirmationHandler();
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

export default withLanguage(ConfirmButton);