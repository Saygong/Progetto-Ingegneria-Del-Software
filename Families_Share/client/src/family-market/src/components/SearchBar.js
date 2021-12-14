import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../components/Log";
import SimpleTextInput from "./SimpleTextInput";

import texts from "../texts";


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
                <table className="w-100 mx-auto">
                    <tr>
                        <td className="w-10icon">
                            <i className="family-icon fas fa-search"/>
                        </td>
                        <td className="w-80Market">
                            <SimpleTextInput text={this.props.text}
                                             description={txt.description}
                                             textChangeHandler={this.handleTextChange}
                                             placeholder={txt.placeholder}/>
                        </td>
                    </tr>
                </table>
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
