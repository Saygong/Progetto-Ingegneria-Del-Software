
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import {NO_CATEGORY, NO_TN_TYPE, DEBUG} from "../../constants";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";
import ApiHandler from "../../api/ApiHandler";
import PostingInfo from "../../api/model/PostingInfo";
import Contact from "../../api/model/Contact";
import React from "react";
import PropTypes from "prop-types";
import PlainNavBar from "../PlainNavBar";
import SimpleInput from "../SimpleInput";
import LargeTextInput from "../LargeTextInput";
import ConfirmButton from "./ConfirmButton";
import DeleteButton from "./DeletePostingButton";
import MailInput from "./MailInput";
import TelephoneInput from "./TelephoneInput";
import PlaceInput from "./PlaceInput";
import ImageInput from "./ImageInput";
import {stringify, Log} from "../../utils";
import CategorySelector from "../CategorySelector";
import TransactionTypeButtons from "../TransactionTypeButtons";

// TODO aggiungere caricamento

/**
 * Class that represents a screen that is used either to edit an existing posting
 *  or to create a new one.
 */
class EditPostingScreen extends React.Component {
    /**
     * This stores all the attributes and info necessary to create/edit a posting,
     * and is updated each time one of these info is changed by the user.
     * @type {{photo: string | Blob | File, name: string,
     *          description: string, category: string, tnType: string,
     *          place: string, mail: string, phoneNumber: string,
     *          inputDisabled: boolean, missingValues: boolean,
     *          confirmationUnsuccessful: boolean,
     *          emailNotValid: boolean}}
     */
    state;

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{postingId: string} | {userId: string, groupId: string}}
     */
    matchParams;

    /**
     * Urls to redirect to after the post has been edited, deleted or created.
     * Passed as additional parameters during the redirection.
     * @type {{goBackRedirection: Object, onEditRedirection: Object, onDeleteRedirection: Object}
     *          | {goBackRedirection: Object, onCreateRedirection: Object}}
     */
    redirections;

    /**
     * Used to communicate with the server api.
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler("", "", DEBUG);
        this.redirections = this.props.location.state;
        this.matchParams = this.props.match.params;
        this.state = {
            name: "",
            description: "",
            photo: "",
            category: NO_CATEGORY[this.props.language],
            tnType: NO_TN_TYPE[this.props.language],
            mail: "",
            phoneNumber: "",
            place: "",

            inputDisabled: false,
            missingValues: false,
            emailNotValid: false,
            confirmationUnsuccessful: false
        }

        // Bind everything because all these methods are called from outside the class
        this.createPosting = this.createPosting.bind(this);
        this.editPosting = this.editPosting.bind(this);
        this.isCreateMode = this.isCreateMode.bind(this);
        this.getPostingInfoFromState = this.getPostingInfoFromState.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleDeleteRedirection = this.handleDeleteRedirection.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].editPostingScreen;
        const title = this.isCreateMode() ? txt.navBar.title.createMode : txt.navBar.title.editMode;

        // If edit mode, get the value from the posting to edit, else take the default "empty value"
        const defaultCat = this.isCreateMode() ? NO_CATEGORY[language] : this.state.category;
        const defaultTnType = this.isCreateMode() ? NO_TN_TYPE[language] : this.state.tnType;

        return (
            <div>
                {/*TODO disabilitare anche questa quando user clicca conferma?*/}
                <PlainNavBar title={title} goBackLocation={this.redirections.goBackRedirection}/>

                <div className="titles">

                    <div className="mt-5">
                        <ImageInput currentImage={this.state.photo}
                                    imageChangeHandler={this.handlePhotoChange} />
                    </div>
                    <hr/>


                    <div className="mt-5 mb-3">
                        <span>{txt.editTitle}</span>
                        <SimpleInput description={txt.nameInput.description}
                                         text={this.state.name}
                                         placeholder={txt.nameInput.placeholder}
                                         textChangeHandler={this.handleNameChange}
                                         type={"text"}/>
                    </div>

                    <div className="mb-3">
                        <CategorySelector value={this.state.category ? this.state.category : defaultCat }
                                          categoryChangeHandler={this.handleCategoryChange} />
                    </div>

                    <div className="mb-5">
                        <TransactionTypeButtons value={this.state.tnType ? this.state.tnType : defaultTnType}
                                                tnTypeChangeHandler={this.handleTnTypeChange}
                                                createMode={true} />
                    </div>

                    <hr className="mb-5"/>

                    <div className="mb-3">
                        <LargeTextInput description={txt.descriptionInput.description}
                                        text={this.state.description}
                                        placeholder={txt.descriptionInput.placeholder}
                                        textChangeHandler={this.handleDescriptionChange} />
                    </div>

                    <hr className="mb-5"/>

                    <h2 className="mb-3">{txt.editContactTitle}</h2>

                    <div className="mb-3">

                        <PlaceInput place={this.state.place}
                                    placeChangeHandler={this.handlePlaceChange}/>

                    </div>
                    <div className="mb-3">

                        <TelephoneInput text={this.state.phoneNumber}
                                        textChangeHandler={this.handleTelephoneChange} />

                    </div>
                    <div className="mb-3">

                        <MailInput text={this.state.mail}
                                   textChangeHandler={this.handleMailChange} />

                    </div>

                    <br className="mb-5"/>
                    { (error && this.state.missingValues) ?
                        (
                            <h2 className="h1-error">{txt.missingValuesError}</h2>
                        ): (error)
                            && <h2 className="h1-error" id="ciao">{txt.emailNotValidError}</h2>

                    }

                    { this.state.confirmationUnsuccessful
                        && <h2 className="h1-error">{txt.confirmationUnsuccessful}</h2>
                    }

                        { !this.state.inputDisabled && this.isCreateMode()
                            && (
                                <div className="row">
                                    <div className="w-95 mx-auto text-center">
                                        <ConfirmButton confirmationHandler={this.handleConfirmation}/>
                                    </div>
                                </div>
                            )}

                        { !this.isCreateMode() && !this.state.inputDisabled
                            && (
                                <div className="row">
                                    <div className="col-5-10 text-center">
                                        <DeleteButton postingId={this.matchParams.postingId}
                                                      redirectionHandler={this.handleDeleteRedirection}/>
                                    </div>
                                    <div className="col-5-10 text-center">
                                        <ConfirmButton confirmationHandler={this.handleConfirmation}/>
                                    </div>
                                </div>

                        )}

                    <br className="mb-5"/>
                </div>
            </div>
        );
    }


    /**
     * Fetch the posting info and update state, only in edit mode.
     * @return {Promise<void>}
     */
    async componentDidMount() {
        if (!this.isCreateMode()) {
            const currentPosting = await this.fetchPosting();
            this.setState({
                name: currentPosting.name,
                description: currentPosting.description,
                photo: currentPosting.photo,
                category: currentPosting.category,
                tnType: currentPosting.type,
                mail: currentPosting.contact.email,
                phoneNumber: currentPosting.contact.phone_number,
                place: currentPosting.contact.place
            });
        }
    }

    /**
     * Returns true if this screen was loaded in create mode, false if in edit mode.
     * @return {boolean}
     */
    isCreateMode() {
        const location = this.props.location;

        // See routes on EditPostingScreen
        return location.pathname.includes("create");
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
     * Called when the user presses the confirmation button.
     * @return {Promise<void>}
     */
    async handleConfirmation() {
        if (this.isInputMissingValues()) {
            this.setState({
                missingValues: true
            });

            return;
        }

        // If the data is valid, disable it
        this.setState({
            disableInput: true
        })

        if (this.isCreateMode()) {
            // Create mode
            const creationSuccessful = await this.createPosting();

            // If not successful, return before redirecting
            if (!creationSuccessful) {
                this.setState({
                    confirmationUnsuccessful: true
                })

                return
            }

            const {onCreateRedirection} = this.redirections;
            Log.info("Creation successful, redirecting to " + stringify(onCreateRedirection), this);
            this.redirect(onCreateRedirection)
        }
        else {
            // Edit mode
            const editSuccessful = await this.editPosting();

            // If not successful, return before redirecting
            if (!editSuccessful) {
                this.setState({
                    confirmationUnsuccessful: true
                })

                return
            }

            const {onEditRedirection} = this.redirections;
            Log.info("Edit successful, redirecting to " + stringify(onEditRedirection), this);
            this.redirect(onEditRedirection)
        }
    }

    /**
     * Returns true if the user has left some input values empty.
     */
    isInputMissingValues() {
        return this.state.name === ""
            || this.state.description === ""
            || this.state.photo === ""
            || this.state.phoneNumber === ""
            || this.state.place === ""
            || this.state.mail === ""
            || this.state.category === NO_CATEGORY[this.props.language]
            || this.state.tnType === NO_TN_TYPE[this.props.language]
    }

    /**
     * Api call to create a posting based on current state.
     * Returns true if the posting was successfully created, false otherwise.
     * @return {Promise<boolean>}
     */
    async createPosting() {
        const creationInfo = this.getPostingInfoFromState()
        const {userId, groupId} = this.matchParams;

        Log.trace(`Creating posting for user: ${userId} in group ${groupId} with info:
        ${stringify(creationInfo)}`, this);
        const newPosting = await this.apiHandler.createPosting(userId, groupId, creationInfo);

        // Empty posting id is "", which a legit posting cannot have
        return newPosting.id !== Posting.EMPTY.id
    }

    /**
     * Api call to edit a posting based on current state.
     * @return {Promise<boolean>}
     */
    async editPosting() {
        const idToEdit = this.matchParams.postingId;
        const editedInfo = this.getPostingInfoFromState()

        Log.trace(`Editing posting [id]${idToEdit} with info:
        ${stringify(editedInfo)}`, this);
        return await this.apiHandler.editPosting(idToEdit, editedInfo);
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
                phone_number: this.state.phoneNumber
            })
        });
    }

    /**
     * Api call to delete the current posting.
     * @return {Promise<void>}
     */
    async deletePosting() {
        const idToDelete = this.matchParams.postingId;


        Log.trace(`Deleting posting [id]${idToDelete}`, this);
        await this.apiHandler.deletePosting(idToDelete);
    }

    /**
     * Called when the user presses the delete button.
     * @return {Promise<void>}
     */
    async handleDeleteRedirection() {
        const {onDeleteRedirection} = this.redirections;
        Log.info("Deletion successful, redirecting to " + stringify(onDeleteRedirection), this);
        this.redirect(onDeleteRedirection)
    }

    /**
     * Redirects to the specified url.
     * The redirection is done by going back with the history and then replacing,
     * which is basically a refresh. This is because, after an edit/create/delete,
     * previous pages have to be refreshed to avoid inconsistencies caused by the
     * history caching their previous states.
     * @param redirection {{pathname: string, state: Object}}
     */
    redirect(redirection) {
        this.props.history.replace(redirection);
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
        return FAMILY_MARKET_BASE_PAGE_URL + "/posting/edit/:postingId";
    }

    /**
     * Returns the url used to redirect to this page in edit mode.
     * Intended for use in react router.
     * @param userId {string} user that creates the posting
     * @param groupId {string} group in which the posting is created
     * @return {string}
     */
    static buildCreateModeUrl(userId, groupId) {
        const basePath = EditPostingScreen.CREATE_MODE_ROUTE;
        const withUserParam = basePath.replace(":userId", userId);

        return withUserParam.replace(":groupId", groupId);
    }

    /**
     * Returns the route path to load this page in create mode.
     * Intended for use in react router.
     * @return {string}
     */
    static get CREATE_MODE_ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/posting/create/users/:userId/groups/:groupId";
    }

    /**
     * Returns a function that handles the redirection to this page in edit mode.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param postingId {string} posting to load on the page
     * @param onEditRedirection {{pathname: string, state: Object}} url and state that determine which
     *      page the user will be redirected to after a posting is edited.
     * @param onDeleteRedirection {{pathname: string, state: Object}} url and state that determine which
     *      page the user will be redirected to after a posting is deleted.
     * @param goBackRedirection {{pathname: string, state: Object}} url and state that determine which
     *      page the user will be redirected after pressing the go back button
     * @return {function}
     *
     * NOTE: state of the redirection has to be passed alongside the path because the entry
     *      on the history stack, after one of those specific actions, is replaced,
     *      which means that it might need a fresh new state.
     */
    static buildEditModeRedirectionHandler(history, postingId,
                                           goBackRedirection,
                                           onEditRedirection,
                                           onDeleteRedirection) {
        return () => {
            history.replace({
                pathname: EditPostingScreen.buildEditModeUrl(postingId),
                state: {
                    goBackRedirection: goBackRedirection,
                    onEditRedirection: onEditRedirection,
                    onDeleteRedirection: onDeleteRedirection
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
     * @param goBackRedirection {{pathname: string, state: Object}} url and state that determine which
     *      page the user will be redirected after pressing the go back button
     * @param onCreateRedirection {{pathname: string, state: Object}} url and state that determine which
     *      page the user will be redirected to after a posting is created.
     * @return {function}
     *
     * NOTE: state of the redirection has to be passed alongside the path because the entry
     *      on the history stack, after one of those specific actions, is replaced,
     *      which means that it might need a fresh new state.
     */
    static buildCreateModeRedirectionHandler(history,
                                             userId, groupId,
                                             goBackRedirection,
                                             onCreateRedirection) {
        return () => {
            history.replace({
                pathname: EditPostingScreen.buildCreateModeUrl(userId, groupId),
                state: {
                    goBackRedirection: goBackRedirection,
                    onCreateRedirection: onCreateRedirection
                }
            });
        }
    }
}

EditPostingScreen.propTypes = {

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
};

export const EditModeRoute = EditPostingScreen.EDIT_MODE_ROUTE;
export const CreateModeRoute = EditPostingScreen.CREATE_MODE_ROUTE;
export const buildCreateModeRedirectionHandler = EditPostingScreen.buildCreateModeRedirectionHandler;
export const buildEditModeRedirectionHandler = EditPostingScreen.buildEditModeRedirectionHandler;

export default withLanguage(EditPostingScreen);
