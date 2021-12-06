const React = require("react");
const Log = require("../../../../src/components/Log");


class PhotoInput extends React.Component {
    /**
     * The photo can be a base64 string, a file or a blob, last two of which
     * are the way images are treated and passed by frontend elements (to my current understanding)
     * @type {{photo: string | File | Blob, selectionChangeHandler: function(string | File | Blob)}}
     */
    props;

    /**
     *
     * @param props {{photo: string | File | Blob, selectionChangeHandler: function(string | File | Blob)}}
     */
    constructor(props) {
        super(props);

        this.handleImageSelection = this.handleImageSelection.bind(this);
    }

    render() {
        // TODO usare react-dropzone
        // https://react-dropzone.js.org/#src
        // permette di settare tipo di file accettati, numero file, minSize e maxSize
    }

    /**
     * Called when a new photo is selected.
     *
     * See https://react-dropzone.js.org/#src function onDrop for more info.
     * @param acceptedFiles {File[]}
     * @return {Promise<void>}
     */
    async handleImageSelection(acceptedFiles) {
        // This is because only one image should be allowed
        this.props.selectionChangeHandler(acceptedFiles[0]);
    }
}

module.exports = PhotoInput;