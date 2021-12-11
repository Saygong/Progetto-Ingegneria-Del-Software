const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");

const texts = require("../texts");
import withLanguage from "../../../src/components/LanguageContext";


class LargeTextInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        // TODO description è il titoletto che va sopra la textbox
        return (
            <div>
                <h2>{this.props.description}</h2>
                <textarea onChange={this.handleTextChange} placeholder={}>
                    {this.props.text}
                </textarea>
            </div>
        );
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
    /**
     * Text to display in the input zone
     */
    text: PropTypes.string,

    /**
     * Text shown when there is no input
     */
    placeholder: PropTypes.string,

    /**
     * Description that is showed alongside the input zone
     */
    description: PropTypes.string,

    /**
     * Function that handles what happens when the text is changed
     */
    textChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(LargeTextInput);