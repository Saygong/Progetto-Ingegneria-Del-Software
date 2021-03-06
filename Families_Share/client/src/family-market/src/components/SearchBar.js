
import withLanguage from "../../../components/LanguageContext";
import texts from "../texts";
import React from "react";
import PropTypes from "prop-types";
import SimpleInput from "./SimpleInput";


class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].searchBar;

        return (
            <div>
                <div>
                    <span>{txt.description}</span>
                </div>
                <div className="text-center">
                    <SimpleInput text={this.props.text}
                                     description={txt.description}
                                     textChangeHandler={this.handleTextChange}
                                     placeholder={txt.placeholder}
                                     type={"text"}/>
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

export default withLanguage(SearchBar);
