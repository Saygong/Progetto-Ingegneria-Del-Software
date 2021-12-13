import withLanguage from "../../../components/LanguageContext";

import React from "react" ;
import PropTypes from "prop-types";
import Log from "../../../components/Log";


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
     * The argument is the event raised by the html input textbox.
     * @param e {InputEvent}
     * @return {Promise<void>}
     */
    async handleTextChange(e) {
        this.props.textChangeHandler(e.target.value);
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

export default withLanguage(SimpleTextInput);
