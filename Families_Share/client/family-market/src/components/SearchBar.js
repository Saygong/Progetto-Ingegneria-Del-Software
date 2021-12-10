const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const SimpleTextInput = require("SimpleTextInput");
import withLanguage from "../../../src/components/LanguageContext";


class SearchBar extends React.Component {

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

SearchBar.defaultProps = {
    text: "",
    textChangeHandler: null
}

SearchBar.propTypes = {
    /**
     * Text to display in the input section
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

module.exports = withLanguage(SearchBar);