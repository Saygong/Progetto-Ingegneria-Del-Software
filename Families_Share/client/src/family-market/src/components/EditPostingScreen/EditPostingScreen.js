import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import {TESTING} from "../../constants";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";

import ApiHandler from "../../api/ApiHandler";
import Posting from "../../api/model/Posting";
import PostingInfo from "../../api/model/PostingInfo";
import Contact from "../../api/model/Contact";

import React from "react";
import PropTypes from "prop-types";
import PlainNavBar from "../PlainNavBar";
import SimpleTextInput from "../SimpleTextInput";
import LargeTextInput from "../LargeTextInput";
import ConfirmButton from "./ConfirmButton";
import DeleteButton from "./DeletePostingButton";
import MailInput from "./MailInput";
import TelephoneInput from "./TelephoneInput";
import PlaceInput from "./PlaceInput";
import ImageInput from "./ImageInput";
import CategoryComboBox from "../CategoryComboBox";
import TransactionTypeComboBox from "../TransactionTypeComboBox";
import Log from "../../../../components/Log";
import {stringify} from "../../utils";



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
     *          place: string, mail: string, phoneNumber: string}}
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

        this.apiHandler = new ApiHandler("", TESTING);
        this.redirections = this.props.location.state;
        this.matchParams = this.props.match.params;
        this.state = {
            name: "",
            description: "",
            photo: "",
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
        this.handleDeleteRedirection = this.handleDeleteRedirection.bind(this);
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
        /**
         * TODO:
         *  - Se è create mode, item di default è "nessuna categoria"
         *  - Se è edit mode, item di default è categoria già presente
         */

        return (
            <div className="titles">
                <PlainNavBar title={title} goBackLocation={this.redirections.goBackRedirection}/>
                <ImageInput currentImage={this.state.photo}
                            imageChangeHandler={this.handlePhotoChange} />

                {/*TextBox where the name is inserted*/}
                <SimpleTextInput description={txt.nameInput.description}
                                 text={this.state.name}
                                 placeholder={txt.nameInput.placeholder}
                                 textChangeHandler={this.handleNameChange} />

                <CategoryComboBox categoryChangeHandler={this.handleCategoryChange} />
                <TransactionTypeComboBox tnTypeChangeHandler={this.handleTnTypeChange} />

                {/*TextBox where the description is inserted*/}
                <LargeTextInput description={txt.descriptionInput.description}
                                text={this.state.description}
                                placeholder={txt.descriptionInput.placeholder}
                                textChangeHandler={this.handleDescriptionChange} />

                {/*TODO sta roba è commentata*/}
                <PlaceInput place={this.state.place}
                            placeChangeHandler={this.handlePlaceChange} />

                <h2>{txt.editContactTitle}</h2>
                <TelephoneInput text={this.state.phoneNumber}
                                textChangeHandler={this.handleTelephoneChange} />
                <MailInput text={this.state.mail}
                           textChangeHandler={this.handleMailChange} />
                <div className="row">
                    <ConfirmButton confirmationHandler={this.handleConfirmation} />
                    { !this.isCreateMode() && <DeleteButton postingId={this.matchParams.postingId}
                                                           redirectionHandler={this.handleDeleteRedirection}/>
                        /* To render only if edit mode */
                    }
                </div>
            </div>
        );
    }


    async componentDidMount() {
        // Fetch the posting info to load only in edit mode
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
        const location = this.props.location
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
     * Api call to create a posting based on current state.
     * @return {Promise<void>}
     */
    async createPosting() {
        const creationInfo = this.getPostingInfoFromState()
        const {userId, groupId} = this.matchParams;

        console.log(`Creating posting for user: ${userId} in group ${groupId} with info:
        ${stringify(creationInfo)}`, this);
        await this.apiHandler.createPosting(userId, groupId, creationInfo);
    }

    /**
     * Api call to edit a posting based on current state.
     * @return {Promise<void>}
     */
    async editPosting() {
        const idToEdit = this.matchParams.postingId;
        const editedInfo = this.getPostingInfoFromState()

        console.log(`Editing posting [id]${idToEdit} with info:
        ${stringify(editedInfo)}`);
        await this.apiHandler.editPosting(idToEdit, editedInfo);
    }

    /**
     * Api call to delete the current posting.
     * @return {Promise<void>}
     */
    async deletePosting() {
        const idToDelete = this.matchParams.postingId;


        console.log(`Deleting posting [id]${idToDelete}`);
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
            // TODO mettere valori default o controlli che forzano inserimento
            photo: this.state.photo ? this.state.photo : "default",
            type: this.state.tnType,
            contact: new Contact({
                email: this.state.mail,
                place: this.state.place ? this.state.place : "default",
                phone_number: this.state.phoneNumber
            })
        });
    }

    /**
     * Called when the user presses the confirmation button.
     * @return {Promise<void>}
     */
    async handleConfirmation() {
        // TODO pallino di caricamento oppure disabilitare i comandi mentre invia i dati?

        if (this.isCreateMode()) {
            // Create mode
            await this.createPosting();

            const {onCreateRedirection} = this.redirections;
            console.log("Creation successful, redirecting to " + stringify(onCreateRedirection), this);
            this.redirect(onCreateRedirection)
        }
        else {
            // Edit mode
            await this.editPosting();

            /** TODO adding a time out here fixes race condition that
             *      happens when the user is redirected to the onEditRedirection page.
             *      This looks dangerous because 3500ms seems to be enough in my environment,
             *      but in a real deployment scenario or in another machine, who knows.
             *      Maybe just put a loading spinner and set 1 or 2 seconds timeout.
             *      That, coupled with a performance enhancement by handling images
             *      in a more efficient way than base64, should be enough.
             */
            setTimeout(() => {
                const {onEditRedirection} = this.redirections;
                console.log("Edit successful, redirecting to " + stringify(onEditRedirection), this);
                this.redirect(onEditRedirection)
            }, 3500);
        }
    }

    /**
     * Called when the user presses the delete button.
     * @return {Promise<void>}
     */
    async handleDeleteRedirection() {
        const {onDeleteRedirection} = this.redirections;
        console.log("Deletion successful, redirecting to " + stringify(onDeleteRedirection), this);
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
