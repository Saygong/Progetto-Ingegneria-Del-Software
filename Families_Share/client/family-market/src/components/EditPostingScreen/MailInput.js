const React = require("react");
const Log = require("../../../../src/components/Log");
const SimpleTextInput = require("../SimpleTextInput");


class MailInput extends React.Component {
    /**
     *
     * @type {{text: string, textChangeHandler: function(string)}}
     */
    props;

    /**
     *
     * @param props {{text: string, textChangeHandler: function(string)}}
     */
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

module.exports = MailInput;