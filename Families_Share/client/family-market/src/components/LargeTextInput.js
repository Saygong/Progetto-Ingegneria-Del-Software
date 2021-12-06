const React = require("react");
const Log = require("../../../../src/components/Log");


class LargeTextInput extends React.Component {

    /**
     * @type {{description: string, text: string, textChangeHandler: function(string)}}
     */
    props;

    /**
     *
     * @param props {{description: string, text: string, textChangeHandler: function(string)}}
     */
    constructor(props) {
        super(props);
    }

    render() {
        // TODO description è il titoletto che va sopra la textbox
    }

    /**
     * Called when the input text of this component is changed.
     * @param newText {string}
     * @return {Promise<void>}
     */
    async onTextChange(newText) {
        this.props.textChangeHandler(newText);
    }
}

module.exports = LargeTextInput;