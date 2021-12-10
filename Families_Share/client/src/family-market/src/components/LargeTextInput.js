import withLanguage from "../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../components/Log");

const texts = require("../texts");



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
                <textarea onChange={this.handleTextChange}>
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

export default ithLanguage(LargeTextInput);