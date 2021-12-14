import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import SimpleTextInput from "../SimpleTextInput";




class MailInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].mailInput;

        return (
            <div className="row no-gutters">
                <div className="col-2-10">
                    <i className="family-icon far fa-envelope"/>
                </div>
                <div className="col-8-10">
                    <SimpleTextInput text={this.props.text} description={txt.description}
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

MailInput.defaultProps = {
    text: "",
    textChangeHandler: null
}

MailInput.propTypes = {
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

export default withLanguage(MailInput);
