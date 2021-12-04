const React = require("react");
const Log = require("../../../../src/components/Log");
const SimpleTextInput = require("../SimpleTextInput");


class MailInput extends React.Component {
    /**
     *
     * @type {{text: string, textChangeHandler: function}}
     */
    props;

    /**
     *
     * @param props {{text: string, textChangeHandler: function}}
     */
    constructor(props) {
        super(props);

    }

    render() {
        // TODO - SimpleTextInput con icona di telefono/mail a sinistra e descrizione vuota.
    }
}

module.exports = MailInput;