const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
const SimpleTextInput = require("Families_Share/client/src/family-market (FAI COPIA) 2 2/src/components/SimpleTextInput");

const texts = require("../texts");
import withLanguage from "../../../src/components/LanguageContext";


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
            <div className="row no-gutters">
                {/*TODO add image*/}
                <img src={} alt={txt.altImageText} className="col-2-10"/>
                <div className="col-8-10">
                    <SimpleTextInput text={this.props.text}
                                     description={this.props.description}
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

module.exports = withLanguage(SearchBar);