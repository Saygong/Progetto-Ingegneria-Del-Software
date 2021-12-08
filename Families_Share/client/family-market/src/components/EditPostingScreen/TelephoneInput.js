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
    text: PropTypes.string,
    textChangeHandler: PropTypes.func.isRequired
}

module.exports = withLanguage(TelephoneInput);