const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";


class LargeTextInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        // TODO description è il titoletto che va sopra la textbox
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

LargeTextInput.defaultProps = {
    text: "",
    description: "",
    textChangeHandler: null
}

LargeTextInput.propTypes = {
    text: PropTypes.string,
    description: PropTypes.string,
    textChangeHandler: PropTypes.func.isRequired
}

module.exports = withLanguage(LargeTextInput);