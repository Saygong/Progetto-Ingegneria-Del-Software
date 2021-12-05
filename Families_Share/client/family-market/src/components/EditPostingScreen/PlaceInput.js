const React = require("react");
const Log = require("../../../../src/components/Log");


class PlaceInput extends React.Component {
    /**
     *
     * @type {{place: string, selectionChangeHandler: function}}
     */
    props;

    /**
     *
     * @param props {{place: string, selectionChangeHandler: function}}
     */
    constructor(props) {
        super(props);

        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    render() {
        // TODO
    }

    async onSelectionChange() {

    }
}

module.exports = PlaceInput;