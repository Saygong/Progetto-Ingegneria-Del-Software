import withLanguage from "../../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");
const SimpleTextInput = require("../SimpleTextInput");

const texts = require("../../texts");


class TelephoneInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].telephoneInput;
        const phoneIconPath = "";

        return (
            <div className="row no-gutters">
                {/*TODO add telephone image*/}
                <img src={phoneIconPath} alt={txt.altImageText} className="col-2-10"/>
                <div className="col-8-10">
                    <SimpleTextInput text={this.props.text} description=""
                                     textChangeHandler={this.handleTextChange}
                                     placeholder={txt.placeholder}/>
                </div>
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

TelephoneInput.defaultProps = {
    text: "",
    textChangeHandler: null
}

TelephoneInput.propTypes = {
    /**
     * Text to display in the input zone
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

module.exports = withLanguage(TelephoneInput);
