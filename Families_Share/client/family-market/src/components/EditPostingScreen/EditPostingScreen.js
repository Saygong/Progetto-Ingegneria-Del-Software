const React = require("react");
const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");
const PostingInfo = require("../../api/model/PostingInfo");
const Contact = require("../../api/model/Contact");

const Log = require("../../../../src/components/Log");
const EditNavBar = require("EditNavBar");
const ConfirmButton = require("ConfirmButton");
const MailInput = require("MailInput");
const TelephoneInput = require("TelephoneInput");
const PlaceInput = require("PlaceInput");
const PhotoInput = require("PhotoInput");
const CategoryComboBox = require("../CategoryComboBox");
const TransactionTypeComboBox = require("../TransactionTypeComboBox");


/**
 * Class that represents a screen that is used either to edit an existing posting
 *  or to create a new one.
 *  To edit an existing posting, isCreateMode must be set to false and a posting object needs
 *  to be passed.
 *  To create a new post, isCreateMode must be true and no posting needs to be passed.
 */
class EditPostingScreen extends React.Component {

    /**
     * @type {{isCreateMode: boolean, userId: string, posting: Posting}}
     */
    props;

    /**
     * @type {{photo: string | Blob | File, name: string, description: string,
     *          tnType: string, place: string, mail: string, telephone: string}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     *
     * @param props {{isCreateMode: boolean, userId: string, posting: Posting}}
     */
    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.state = {
            photo: "",
            name: "",
            description: "",
            tnType: "",
            contact: Contact.EMPTY
        }

        this.createPosting = this.createPosting.bind(this);
        this.editPosting = this.editPosting.bind(this);
        this.handleEditConfirmation = this.handleEditConfirmation.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);
    }

    render() {
        // TODO
    }

    createPosting() {

    }

    editPosting() {

    }

    handleEditConfirmation() {

    }

    handlePhotoChange() {

    }

    handleNameChange() {

    }

    handleDescriptionChange() {

    }

    handleTnTypeChange() {

    }

    handleCategoryChange() {

    }

    handleTelephoneChange() {

    }

    handleMailChange() {

    }
}

EditPostingScreen.defaultProps = {
    isCreateMode: false,
    userId: "",
    posting: Posting.EMPTY
}

module.exports = EditPostingScreen;