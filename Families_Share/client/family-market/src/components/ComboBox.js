const React = require("react");
const Log = require("../../../../src/components/Log");


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


    }

    render() {
        // TODO
    }

    /**
     * Called when the selected value of this component is changed.
     * @param newSelection {string}
     * @return {Promise<void>}
     */
    async onSelectionChange(newSelection) {
        this.props.selectionChangeHandler(newSelection)



        xxx devo cambiare i parametri che vengono accettati dai vari metodi onQualcosa;
        xxx cambiare anche nomenclatura da onQualcosa a handleQualcosa?
    }
}

ComboBox.defaultProps = {
    itemList: [],
    selectedItem: "",
    iconPath: "",
    selectionChangeHandler: () => { }
}

module.exports = ComboBox;