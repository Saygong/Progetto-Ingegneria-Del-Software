const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");
const PostingInfo = require("../../api/model/PostingInfo");
const Contact = require("../../api/model/Contact");

const {FAMILY_MARKET_BASE_URL} = require("../../constants");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const ConfirmButton = require("ConfirmButton");
const DeleteButton = require("../DeleteButton");
const MailInput = require("MailInput");
const TelephoneInput = require("TelephoneInput");
const PlaceInput = require("PlaceInput");
const PhotoInput = require("PhotoInput");
const CategoryComboBox = require("../CategoryComboBox");
const TransactionTypeComboBox = require("../TransactionTypeComboBox");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents a screen that is used either to edit an existing posting
 *  or to create a new one.
 *  To edit an existing posting, isCreateMode must be set to false and a posting object needs
 *  to be passed.
 *  To create a new post, isCreateMode must be true and no posting needs to be passed.
 */
class EditPostingScreen extends React.Component {
    /**
     * This stores all the attributes and info necessary to create/edit a posting,
     * and is updated each time one of these info is changed by the user.
     * @type {{photo: string | Blob | File, name: string,
     *          description: string, category: string, tnType: string,
     *          place: string, mail: string, phoneNumber: string}}
     */
    state;

    /**
     * @type {{postingId: string} | {userId: string, groupId: string}}
     */
    matchParams;

    /**
     * @type {{onEditUrl: string, onDeleteUrl} | {onCreateUrl: string}}
     */
    locationState;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.locationState = this.props.location.state;
        this.matchParams = this.props.match.params;
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
        this.isCreateMode = this.isCreateMode.bind(this);
        this.getPostingInfoFromState = this.getPostingInfoFromState.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleDeletion = this.handleDeletion.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);

        // NOTE: no goBackState is set here since you shouldn't be able to go back to this page.
        //  this should be a leaf in the navigation tree.
    }

    render() {
        // TODO
    }

    async componentDidMount() {
        // TODO fetch posting and set state accordingly
        const currentPosting = await this.fetchPosting();
    }

    /**
     *
     * @return {Promise<Posting|Posting.EMPTY>}
     */
    async fetchPosting() {
        const postingId = this.matchParams.postingId;

        return this.apiHandler.getPosting(postingId);
    }

    /**
     * Api call to create a posting based on current state.
     * @return {Promise<void>}
     */
    async createPosting() {
        const creationInfo = this.getPostingInfoFromState()
        const {userId, groupId} = this.matchParams;

        await this.apiHandler.createPosting(userId, groupId, creationInfo);
    }

    /**
     * Api call to edit a posting based on current state.
     * @return {Promise<void>}
     */
    async editPosting() {
        const idToEdit = this.matchParams.postingId;
        const editedInfo = this.getPostingInfoFromState()

        await this.apiHandler.editPosting(idToEdit, editedInfo);
    }

    /**
     * Api call to delete the current posting.
     * @return {Promise<void>}
     */
    async deletePosting() {
        const idToDelete = this.matchParams.postingId;

        await this.apiHandler.deletePosting(idToDelete);
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
    async handleConfirmation() {
        if (this.isCreateMode()) {
            // Create mode
            await this.createPosting();

            const {onCreateUrl} = this.locationState;
            Log.info("Creation successful, redirecting to " + onCreateUrl, this);
            this.props.history.replace(onCreateUrl);
        }
        else {
            // Edit mode
            await this.editPosting();

            const {onEditUrl} = this.locationState;
            Log.info("Edit successful, redirecting to " + onEditUrl, this);
            this.props.history.replace(onEditUrl);
        }
    }

    /**
     * Called when the user presses the delete button.
     * @return {Promise<void>}
     */
    async handleDeletion() {
        const {onDeleteUrl} = this.locationState;
        Log.info("Deletion successful, redirecting to " + onDeleteUrl, this);
        this.props.history.replace(onDeleteUrl);
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

    /**
     * Returns true if this screen was loaded in create mode, false if in edit mode.
     * @return {boolean}
     */
    isCreateMode() {
        const location = this.props.location
        return location.pathname.includes("create");
    }

    /**
     * Returns the url used to redirect to to this page in edit mode.
     * @param postingId {string} posting to load when this page is loaded.
     * @return {string}
     */
    static buildEditModeUrl(postingId) {
        const basePath = EditPostingScreen.EDIT_MODE_ROUTE;

        return basePath.replace(":postingId", postingId);
    }

    /**
     * Returns the route path to load this page in edit mode.
     * @return {string}
     */
    static get EDIT_MODE_ROUTE() {
        return FAMILY_MARKET_BASE_URL + "/posting/edit/:postingId";
    }

    /**
     * Returns the url used to redirect to this page in edit mode.
     * Intended for use in react router.
     * @param userId {string} user that creates the posting
     * @param groupId {string} group in which the posting is created
     * @return {string}
     */
    static buildCreateModeUrl(userId, groupId) {
        return EditPostingScreen.CREATE_MODE_ROUTE;
    }

    /**
     * Returns the route path to load this page in create mode.
     * Intended for use in react router.
     * @return {string}
     */
    static get CREATE_MODE_ROUTE() {
        return FAMILY_MARKET_BASE_URL + "/posting/create/users/:userId/groups/:groupId";
    }

    /**
     * Returns a function that handles the redirection to this page in edit mode.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param postingId {string} posting to load on the page
     * @param onEditUrl {string} url to redirect to when a posting is edited.
     * @param onDeleteUrl {string} url to redirect to when a posting is deleted.
     * @return {function}
     */
    static buildEditModeRedirectionHandler(history, postingId, onEditUrl, onDeleteUrl) {
        return () => {
            /**
             * Use replace here, since push can lead to inconsistencies:
             * in this page a posting can be edited or deleted, so it is better to not leave
             * any entry on the history stack whose state can differ from the updated one
             * (e.g. a posting gets deleted, you go back and the page still has that posting
             *  because it hasn't been reloaded)
             */
            history.replace({
                pathname: EditPostingScreen.buildEditModeUrl(postingId),
                state: {
                    onEditUrl: onEditUrl,
                    onDeleteUrl: onDeleteUrl
                }
            });
        }
    }

    /**
     * Returns a function that handles the redirection to this page in create mode.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param userId {string} user that creates the posting
     * @param groupId {string} group in which the posting is created
     * @param onCreateUrl {string} url to redirect to when a posting is edited.
     * @return {function}
     */
    static buildCreateModeRedirectionHandler(history, userId, groupId, onCreateUrl) {
        return () => {
            /**
             * Use replace here, since push can lead to inconsistencies:
             * in this page a posting can be created, so it is better to not leave
             * any entry on the history stack whose state can differ from the updated one
             * (e.g. a posting gets deleted, you go back and the page still doesn't have
             *  that posting because it hasn't been reloaded)
             */
            history.replace({
                pathname: EditPostingScreen.buildCreateModeUrl(userId, groupId),
                state: {
                    onCreateUrl: onCreateUrl
                }
            });
        }
    }
}

module.exports = {
    EditPostingScreen: withLanguage(EditPostingScreen),
    EditModeRoute: EditPostingScreen.EDIT_MODE_ROUTE,
    CreateModeRoute: EditPostingScreen.CREATE_MODE_ROUTE,
    buildCreateModeRedirectionHandler: EditPostingScreen.buildCreateModeRedirectionHandler,
    buildEditModeRedirectionHandler: EditPostingScreen.buildEditModeRedirectionHandler
};