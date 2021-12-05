const VALID_TN_TYPES = require("../../constants").TN_TYPES;

const React = require("react");
const Log = require("../../../../src/components/Log");
const ComboBox = require("ComboBox");


class TransactionTypeComboBox extends React.Component {

    /**
     * @type {{description: string, selectedTnType: string, tnTypeChangeHandler: function}}
     */
    props;

    /**
     *
     * @param props {{description: string, selectedTnType: string, tnTypeChangeHandler: function}}
     */
    constructor(props) {
        super(props);

    }

    render() {
        // TODO pass the typeChangeHandler down to the base ComboBox
    }
}

module.exports = TransactionTypeComboBox;
