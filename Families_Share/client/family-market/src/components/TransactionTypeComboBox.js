const VALID_TN_TYPES = require("../constants").TN_TYPES;

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const ComboBox = require("ComboBox");
import withLanguage from "../../../src/components/LanguageContext";


class TransactionTypeComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
    }

    render() {
        // TODO pass the typeChangeHandler down to the base ComboBox
        // itemList della ComboBox di base è VALID_TN_TYPES
    }


    /**
     * Called when the selected transaction type in the combobox changes.
     * @param newTnType {string}
     */
    async handleTnTypeChange(newTnType) {
        this.props.tnTypeChangeHandler(newTnType);
    }
}

TransactionTypeComboBox.defaultProps = {
    itemList: [],
    selectedItem: "",
    iconPath: "",
    tnTypeChangeHandler: null
}

TransactionTypeComboBox.propTypes = {
    /**
     * List of items to display
     */
    itemList: PropTypes.arrayOf(PropTypes.string),

    /**
     * Currently selected item
     */
    selectedItem: PropTypes.string,

    /**
     * Path of the image to show alongside the combobox
     */
    iconPath: PropTypes.string,

    /**
     * Function that handles what happens when the selected item changes
     */
    tnTypeChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(TransactionTypeComboBox);
