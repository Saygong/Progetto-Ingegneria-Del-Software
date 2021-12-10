const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const SimpleTextInput = require("../SimpleTextInput");
import withLanguage from "../../../../src/components/LanguageContext";


class TelephoneInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        // TODO - SimpleTextInput con icona di telefono/mail a sinistra e descrizione vuota.
    }

    /**
     * Called when the input text of this component is changed.
     * @param newText {string}
     * @return {Promise<void>}
     */
    async handleTextChange(newText) {
        this.props.textChangeHandler(newText);
    }
}

TelephoneInput.defaultProps = {
    text: "",
    textChangeHandler: null
}

TelephoneInput.propTypes = {
    /**
     * Text to display in the input zone
     */
    text: PropTypes.string,

    /**
     * Function that handles what happens when the text is changed
     */
    textChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(TelephoneInput);