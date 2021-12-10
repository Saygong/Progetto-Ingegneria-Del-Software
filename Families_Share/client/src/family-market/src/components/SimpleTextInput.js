import withLanguage from "../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../components/Log");



class SimpleTextInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        return (
            <div>
                <h2>{this.props.description}</h2>
                <input type="text"
                       value={this.props.text}
                       onChange={this.handleTextChange}
                       placeholder={this.props.placeholder}/>
            </div>
        )
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

SimpleTextInput.defaultProps = {
    text: "",
    description: "",
    placeholder: "placeholder",
    textChangeHandler: null
}

SimpleTextInput.propTypes = {
    /**
     * Text to display in the input section
     */
    text: PropTypes.string,

    /**
     * Description to show alongside the input section
     */
    description: PropTypes.string,

    /**
     * Text displayed when no input is present
     */
    placeholder: PropTypes.string,

    /**
     * Function that handles what happens when the text is changed
     */
    textChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(SimpleTextInput);