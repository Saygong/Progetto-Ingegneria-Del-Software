const React = require("react");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";


class ComboBox extends React.Component {

    /**
     *
     * @type {{itemList: string[], selectedItem: string, iconPath: string,
     *          selectionChangeHandler: function(string)}}
     */
    props;

    /**
     *
     * @param props {{itemList: string[], selectedItem: string, iconPath: string,
     *          selectionChangeHandler: function(string)}}
     */
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
    selectionChangeHandler: () => { }
}

module.exports = withLanguage(ComboBox);