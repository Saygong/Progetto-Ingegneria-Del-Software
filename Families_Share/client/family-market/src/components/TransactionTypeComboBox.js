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
    itemList: PropTypes.arrayOf(PropTypes.string),
    selectedItem: PropTypes.string,
    iconPath: PropTypes.string,
    tnTypeChangeHandler: PropTypes.func.isRequired
}

module.exports = withLanguage(TransactionTypeComboBox);
