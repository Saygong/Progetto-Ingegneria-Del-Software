const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


class ImageInput extends React.Component {

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
        this.props.photoChangeHandler(acceptedFiles[0]);
    }
}

ImageInput.defaultProps = {
    image: "",
    photoChangeHandler: null
}

ImageInput.propTypes = {
    image: PropTypes.string,
    photoChangeHandler: PropTypes.func
}

module.exports = withLanguage(ImageInput);