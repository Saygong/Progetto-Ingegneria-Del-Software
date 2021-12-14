import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import React from "react";
import {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
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
        // TODO non so come passare txt a Previews

        return (
            <div>
                {/*TODO se Previews funziona allora cancellare*/}
                {/*<Dropzone accept="image/jpeg, image/png"*/}
                {/*          multiple={false} maxFiles={1} maxSize={MAX_IMAGE_SIZE}*/}
                {/*          onDrop={this.handleImageSelection}>*/}
                {/*    {({getRootProps, getInputProps}) => (*/}
                {/*        <section>*/}
                {/*            <div {...getRootProps()}>*/}
                {/*                <input {...getInputProps()} />*/}
                {/*                <p>{txt.dropzoneText}</p>*/}
                {/*            </div>*/}
                {/*            /!*<img className="img-8-10" src={this.props.currentImage} alt={txt.altImageText}/>*!/*/}
                {/*        </section>*/}
                {/*    )}*/}
                {/*</Dropzone>*/}

                <Previews />

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


/**Per drag and drop + preview*/
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
    margin: 'auto'
};

function Previews(props) {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: false,
        maxFiles: 1,
        maxSize: MAX_IMAGE_SIZE,
        onDrop: acceptedFiles => {
            // handleImageSelection;
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            // this.handleImageSelection;
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />

                {/*TODO mettere anche in ITA*/}
                <p>Drag and drop some files here, or Click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}

export default withLanguage(ImageInput);
