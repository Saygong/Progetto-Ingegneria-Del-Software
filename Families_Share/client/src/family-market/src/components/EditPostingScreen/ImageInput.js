import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Compressor from 'compressorjs';
import Log from "../../../../components/Log";


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
                <Dropzone accept="image/jpeg, image/png"
                          multiple={false} maxFiles={1} maxSize={MAX_IMAGE_SIZE}
                          onDrop={this.handleImageSelection}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>{txt.dropzoneText}</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <img className="img_postingInfo" src={this.props.currentImage} alt={txt.altImageText}/>
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
        /** TODO capire come va gestito il "data:image/<format>;base64,".
         * https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
         * questo si occupa già di aggiungere i metadati (data:image... ecc.) e prende come argomento
         * un blob, che è quello che viene restituito da componenti html che accettano un file
         * (vedi react dropzone). Tu gli passi il blob e lui converte.
         * Di più su questo tutorial:
         * https://medium.com/js-dojo/how-to-upload-base64-images-in-vue-nodejs-4e89635daebc
         * For image compression:
         * https://stackoverflow.com/questions/14672746/how-to-compress-an-image-via-javascript-in-the-browser
         * Probabilmente ha senso mettere una size limit all'utente e far comprimere le immagini lato client
         * in maniera asincrona, in modo che non sono pesantissime da inviare e salvare.
         *
         * TODO mettere file api.config in cui si mette dimensione max immagine e rapporto compressione?
         */
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
