import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../components/Log";

import texts from "../texts";


class LargeTextInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        return (
            <div>
                <h2>{this.props.description}</h2>
                <textarea onChange={this.handleTextChange}
                          placeholder={this.props.placeholder}>
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

export default withLanguage(LargeTextInput);
