const VALID_TN_TYPES = require("../../constants").TN_TYPES;

const React = require("react");
const Log = require("../../../../src/components/Log");


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

    }
}

module.exports = TransactionTypeComboBox;
