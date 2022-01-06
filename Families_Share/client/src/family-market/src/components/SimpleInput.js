
import withLanguage from "../../../components/LanguageContext";
import React from "react" ;
import PropTypes from "prop-types";


class SimpleInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        return (
            <div>
                <input type={this.props.type}
                       value={this.props.text}
                       onChange={this.handleTextChange}
                       placeholder={this.props.placeholder}
                       className="txtbxPosting"
                />
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

SimpleInput.defaultProps = {
    text: "",
    description: "",
    placeholder: "placeholder",
    textChangeHandler: null
}

SimpleInput.propTypes = {
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
    language: PropTypes.string,

    /**
     * Defines the type of input we are going to show
     */
    type: PropTypes.string
}

export default withLanguage(SimpleInput);
