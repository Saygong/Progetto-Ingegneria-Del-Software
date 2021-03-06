
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Compressor from 'compressorjs';

// 10MB is more than enough, also, MongoDb allows for max document size of 16MB
export const MAX_IMAGE_SIZE = 10000000;


class ImageInput extends React.Component {

    constructor(props) {
        super(props);

        this.handleImageSelection = this.handleImageSelection.bind(this);
    }



    render() {
        const language = this.props.language;
        const txt = texts[language].imageInput;

        return (
            <div>
                <div className="my-1 border-lightgray">
                    <Dropzone accept="image/jpeg, image/png"
                              multiple={false} maxFiles={1} maxSize={MAX_IMAGE_SIZE}
                              onDrop={this.handleImageSelection}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className="cursor-pointer size-1rem">{txt.dropzoneText}</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                { this.props.currentImage && (
                    <div className="image-preview">
                        <img src={this.props.currentImage}  width="100%" height="100%" className="image-preview__image" alt=""/>
                    </div>
                )}
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
        // This is fine because only one image should be allowed
        const selectedImage = acceptedFiles[0];

        // https://medium.com/front-end-weekly/image-compression-in-reactjs-a07ec0066b24
        new Compressor(selectedImage, {
            quality: 0.6, // Recommended not to go below 0.6
            success: (compressedResult) => {
                let base64Image;

                const reader = new FileReader();
                reader.onload = () => {
                    base64Image = reader.result;

                    this.props.imageChangeHandler(base64Image);
                }

                reader.readAsDataURL(compressedResult);
            },
        });
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

ImageInput.defaultProps = {
    currentImage: null
}
export default withLanguage(ImageInput);
