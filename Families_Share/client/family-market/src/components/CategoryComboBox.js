const VALID_CATEGORIES = require("../constants").CATEGORIES;

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const ComboBox = require("ComboBox");
import withLanguage from "../../../src/components/LanguageContext";


class CategoryComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    render() {
        // TODO pass the categoryChangeHandler down to the base ComboBox
        // itemList della ComboBox di base è VALID_CATEGORIES
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