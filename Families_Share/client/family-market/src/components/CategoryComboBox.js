const VALID_CATEGORIES = require("../../constants").CATEGORIES;

const React = require("react");
const Log = require("../../../../src/components/Log");
const ComboBox = require("ComboBox");


class CategoryComboBox extends React.Component {

    /**
     * @type {{description: string, selectedCategory: string, categoryChangeHandler: function(string)}}
     */
    props;

    /**
     *
     * @param props {{description: string, selectedCategory: string, categoryChangeHandler: function(string)}}
     */
    constructor(props) {
        super(props);

    }

    render() {
        // TODO pass the categoryChangeHandler down to the base ComboBox
        // itemList della ComboBox di base è VALID_CATEGORIES
    }
}

module.exports = CategoryComboBox;