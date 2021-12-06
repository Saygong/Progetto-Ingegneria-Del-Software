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
     * @type {{isCreateMode: boolean, userId: string, groupId: string, posting: Posting}}
     */
    props;

    /**
     * This stores all the attributes and info necessary to create/edit a posting,
     * and is updated each time one of these info is changed by the user.
     * @type {{photo: string | Blob | File, name: string,
     *          description: string, category: string, tnType: string,
     *          place: string, mail: string, phoneNumber: string}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     *
     * @param props {{isCreateMode: boolean, userId: string, groupId: string, posting: Posting}}
     */
    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.state = {
            photo: "",
            name: "",
            description: "",
            category: "",
            tnType: "",
            mail: "",
            phoneNumber: "",
            place: ""
        }

        // Bind everything because all these methods are called from outside the class
        this.createPosting = this.createPosting.bind(this);
        this.editPosting = this.editPosting.bind(this);
        this.getPostingInfoFromState = this.getPostingInfoFromState.bind(this);
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

    async createPosting() {
        const creationInfo = this.getPostingInfoFromState()

        await this.apiHandler.createPosting(this.props.userId, this.props.groupId, creationInfo);
    }

    async editPosting() {
        const idToEdit = this.props.posting.id;
        const editedInfo = this.getPostingInfoFromState()

        await this.apiHandler.editPosting(idToEdit, editedInfo);
    }

    /**
     * Returns a PostingInfo object created from the current state.
     * @return {PostingInfo}
     */
    getPostingInfoFromState() {
        return new PostingInfo({
            name: this.state.name,
            category: this.state.category,
            description: this.state.description,
            photo: this.state.photo,
            type: this.state.tnType,
            contact: new Contact({
                email: this.state.mail,
                place: this.state.place,
                phoneNumber: this.state.phoneNumber
            })
        });
    }

    /**
     * Called when the user presses the confirmation button.
     * @return {Promise<void>}
     */
    async handleEditConfirmation() {
        if (this.props.isCreateMode) {
            await this.createPosting();
        }
        else {
            await this.editPosting();
        }
    }

    /**
     * Called when a new photo is selected in the PhotoInput
     * @param newPhoto {string | Blob | File}
     */
    handlePhotoChange(newPhoto) {
        this.setState({
            photo: newPhoto
        });
    }

    /**
     * Called when the text on the name's SimpleTextInput is changed.
     * @param newName {string}
     */
    handleNameChange(newName) {
        this.setState({
            name: newName
        });
    }

    /**
     * Called when the text on the description's LargeTextInput is changed.
     * @param newDescription {string}
     */
    handleDescriptionChange(newDescription) {
        this.setState({
            description: newDescription
        });
    }

    /**
     * Called when a new transaction type is selected in the TransactionTypeComboBox.
     * @param newTnType {string}
     */
    handleTnTypeChange(newTnType) {
        this.setState({
            tnType: newTnType
        });
    }

    /**
     * Called when a new category is selected in the CategoryComboBox.
     * @param newCategory {string}
     */
    handleCategoryChange(newCategory) {
        this.setState({
            category: newCategory
        });
    }

    /**
     * Called when the text on the TelephoneInput is changed.
     * @param newPhoneNumber {string}
     */
    handleTelephoneChange(newPhoneNumber) {
        this.setState({
            phoneNumber: newPhoneNumber
        });
    }

    /**
     * Called when the text on the MailInput is changed.
     * @param newMail {string}
     */
    handleMailChange(newMail) {
        this.setState({
            mail: newMail
        });
    }

    /**
     * Called when a new place on the PlaceInput is selected.
     * @param newPlace {string}
     */
    handlePlaceChange(newPlace) {
        this.setState({
            place: newPlace
        });
    }
}

EditPostingScreen.defaultProps = {
    isCreateMode: false,
    userId: "",
    posting: Posting.EMPTY
}

module.exports = EditPostingScreen;