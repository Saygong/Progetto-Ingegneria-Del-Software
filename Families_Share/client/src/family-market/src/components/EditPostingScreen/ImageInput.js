import withLanguage from "../../../../components/LanguageContext";
import Dropzone from "react-dropzone";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");
const texts = require("../../texts");


class ImageInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleImageSelection = this.handleImageSelection.bind(this);
    }

    render() {
        // TODO usare react-dropzone
        // https://react-dropzone.js.org/#src
        // permette di settare tipo di file accettati, numero file, minSize e maxSize
        const language = this.props.language;
        const txt = texts[language].imageInput;

        // 5MB ?? poi sarebbe da comprimere in qualche modo
        const maxByteSize = 5000000;

        return (
            <div>
                <Dropzone accept="image/jpeg, image/png"
                          multiple={false} maxFiles={1} maxSize={maxByteSize}
                          onDrop={this.handleImageSelection}>
                    <p>{txt.dropzoneText}</p>
                </Dropzone>
            </div>
        )
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

export default withLanguage(ImageInput);
