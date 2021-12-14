import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Compressor from 'compressorjs';
import {stringify, Log} from "../../utils";

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
                {/*<Dropzone accept="image/jpeg, image/png"*/}
                {/*          multiple={false} maxFiles={1} maxSize={MAX_IMAGE_SIZE}*/}
                {/*          onDrop={this.handleImageSelection}>*/}
                {/*    {({getRootProps, getInputProps}) => (*/}
                {/*        <section>*/}
                {/*            <div {...getRootProps()}>*/}
                {/*                <input {...getInputProps()} />*/}
                {/*                <p>{txt.dropzoneText}</p>*/}
                {/*            </div>*/}
                {/*            <img className="img-8-10" src={this.props.currentImage} alt={txt.altImageText}/>*/}
                {/*        </section>*/}
                {/*    )}*/}
                {/*</Dropzone>*/}
                {/*<input type="file" name="inpFile" id="inpFile" class="m-top-20"/>*/}
                {/*<div class="image-preview" id="imagePreview">*/}
                {/*    <img src={this.props.currentImage} alt={txt.altImageText} className="image-preview__image" />*/}
                {/*    <span class="image-preview__default-text">Image Preview</span>*/}
                {/*</div>*/}
                
                {/*<script>*/}
                {/*    //prendermi l'immagine*/}
                {/*    //faccio reference agli elementi html con gli id*/}
                {/*    const inpFile = document.getElementById("inpFile");*/}
                {/*    const previewContainer = document.getElementById("imagePreview");*/}
                {/*    const previewImage = previewContainer.querySelector("image-preview__image");*/}
                {/*    const previewDefaultText = previewContainer.querySelector("image-preview__default-text");*/}

                {/*    inpFile*/}
                {/*</script>*/}
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

export default withLanguage(ImageInput);
