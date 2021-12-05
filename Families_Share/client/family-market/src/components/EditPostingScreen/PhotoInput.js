const React = require("react");
const Log = require("../../../../src/components/Log");


class PhotoInput extends React.Component {
    /**
     * The photo can be a base64 string, a file or a blob, last two of which
     * are the way images are treated and passed by frontend elements (to my current understanding)
     * @type {{photo: string | File | Blob, selectionChangeHandler: function}}
     */
    props;

    /**
     *
     * @param props {{photo: string | File | Blob, selectionChangeHandler: function}}
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

module.exports = PhotoInput;