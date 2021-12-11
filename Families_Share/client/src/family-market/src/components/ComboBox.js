const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";


class ComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    render() {
        // TODO usare react-responsive-combobox
        // https://react-combobox.netlify.app/docs-props
        // editable = false perché utente non può mettere input con tastiera
    }

    /**
     * Called when the selected value of this component is changed.
     * @param newSelection {string}
     * @return {Promise<void>}
     */
    async handleSelectionChange(newSelection) {
        this.props.selectionChangeHandler(newSelection)
    }
}

ComboBox.defaultProps = {
    itemList: [],
    selectedItem: "",
    iconPath: "",
    selectionChangeHandler: null
}

ComboBox.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.string),
    selectedItem: PropTypes.string,
    iconPath: PropTypes.string,
    selectionChangeHandler: PropTypes.func.isRequired
}

export default withLanguage(ComboBox);