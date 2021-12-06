const React = require("react");
const Log = require("../../../../src/components/Log");
const SimpleTextInput = require("SimpleTextInput");


class SearchBar extends React.Component {

    /**
     * @type {{text: string, textChangeHandler: function}}
     */
    props;

    /**
     *
     * @param props {{text: string, textChangeHandler: function}}
     */
    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        // TODO dato che l'unica differenza tra questo e un SimpleTextInput è l'immagine della lente d'ingrandimento.
        // si potrebbe semplicemente usare un quel componente affiancato all'immagine
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

module.exports = SearchBar;