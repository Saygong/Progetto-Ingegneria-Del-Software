const VALID_CATEGORIES = require("../constants").CATEGORIES;

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
const ComboBox = require("ComboBox");

const texts = require("../texts");
import withLanguage from "../../../src/components/LanguageContext";


class CategoryComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].categoryComboBox;

        return (
            <div>
                <h2>{txt.description}</h2>
                <div className="row no-gutters">
                    <div className="col-2-10">
                        {/*TODO add category icon*/}
                        <img src={} alt={txt.altImageText} className="center"/>
                    </div>
                    <div className="col-8-10">
                        <ComboBox itemList={VALID_CATEGORIES}
                                  selectedItem={this.props.selectedItem}
                                  selectionChangeHandler={this.handleCategoryChange}/>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Called when the selected category in the combobox changes.
     * @param newCategory {string}
     */
    async handleCategoryChange(newCategory) {
        this.props.categoryChangeHandler(newCategory);
    }
}

CategoryComboBox.defaultProps = {
    itemList: [],
    selectedItem: "",
    iconPath: "",
    categoryChangeHandler: null
}

CategoryComboBox.propTypes = {
    /**
     * List of items to display
     */
    itemList: PropTypes.arrayOf(PropTypes.string),

    /**
     * Item currently selected
     */
    selectedItem: PropTypes.string,

    /**
     * Path of the icon to display along the combobox
     */
    iconPath: PropTypes.string,

    /**
     * Function that handles what happen when the selected category is changed
     */
    categoryChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(CategoryComboBox);