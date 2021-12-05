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
    }

    render() {
        // TODO dato che l'unica differenza tra questo e un SimpleTextInput è l'immagine della lente d'ingrandimento.
        // si potrebbe semplicemente usare un quel componente affiancato all'immagine
    }

    async onTextChange() {
        // TODO richiamare props.textChangeHandler()
    }
}

module.exports = SearchBar;