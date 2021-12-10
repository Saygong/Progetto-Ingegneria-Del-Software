import withLanguage from "../../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");



class ImageInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleImageSelection = this.handleImageSelection.bind(this);
    }

    render() {
        return;
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
        this.props.imageChangeHandler(acceptedFiles[0]);
    }
}

ImageInput.defaultProps = {
    image: "",
    imageChangeHandler: null
}

ImageInput.propTypes = {
    /**
     * Image to display
     */
    currentImage: PropTypes.oneOfType(
        [PropTypes.string, PropTypes.instanceOf(File), PropTypes.instanceOf(Blob)]),

    /**
     * Function that handles what happens when the selected image is changed
     */
    imageChangeHandler: PropTypes.func,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(ImageInput);