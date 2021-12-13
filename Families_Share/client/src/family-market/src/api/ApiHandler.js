import Log from "../../../components/Log";

import Posting from "./model/Posting";
import PostingInfo from "./model/PostingInfo";
import GroupInfo from "./model/GroupInfo";
import Contact from "./model/Contact";
const axios = require("axios");

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

/**
 * Class for handling requests and responses to/from the server side api
 * relative to the Family Market extension.
 *
 * NOTE:
 * The policy of Families Share in regard to wrong api calls or api errors seems to be:
 * - client side, just to log the error, without throwing any exception or returning null values.
 *      Instead, objects with empty properties are returned.
 * - server side, to return an appropriate error code.
 * The policy adopted in Family Market and in this class will be the same.
 */
class ApiHandler {
    /**
     *
     * @param log {Log} Logger used by this instance to log response data.
     * @param authToken {string} Token used to authenticate the user that makes the requests.
     *      Set in the AUTHORIZATION field of the request header.
     */
    constructor(authToken="", log=null) {
        if (authToken !== "") {
            // Set default auth header with the token of the user that makes the requests
            // this is necessary because the server checks if the user is authenticated
            // by verifying the token
            axios.defaults.headers.common["Authorization"] = authToken;
        }

        this.log = log;

        this.getGroupPostings = this.getGroupPostings.bind(this);
        this.getPosting = this.getPosting.bind(this);
        this.createPosting = this.createPosting.bind(this);
        this.editPosting = this.editPosting.bind(this);
        this.deletePosting = this.deletePosting.bind(this);
        this.getUserPostings = this.getUserPostings.bind(this);
        this.getUserFavouritePostings = this.getUserFavouritePostings.bind(this);
        this.editUserFavourites = this.editUserFavourites.bind(this);
        this.logResponseInternal = this.logResponseInternal.bind(this);
    }

    /**
     * Families Share (original) base url for the api
     * @return {string}
     */
    static get FS_API_BASE_URL() {
        return "http://localhost:4000/api"
    }

    /**
     * Family Market base url for the api
     * @return {string}
     */
    static get FM_API_BASE_URL() {
        return `${ApiHandler.FS_API_BASE_URL}/family-market`;
    }

    static get POSTINGS_BASE_URL() {
        return `${ApiHandler.FM_API_BASE_URL}/postings`;
    }

    static get GROUPS_BASE_URL() {
        return `${ApiHandler.FM_API_BASE_URL}/groups`;
    }

    static get USERS_BASE_URL() {
        return `${ApiHandler.FM_API_BASE_URL}/users`;
    }

    /**
     * Queries the api and returns an array of Posting objects belonging to the specified group.
     * In case an error occurred, an empty array is returned.
     * @param groupId {string} id of the group
     * @return {Promise<Posting[] | []>} array of postings belonging to the group or empty array.
     */
    async getGroupPostings(groupId) {
        let postings = [];
        const routeUrl = `${ApiHandler.GROUPS_BASE_URL}/${groupId}/postings`
        await axios.get(routeUrl)
            .then(response => {
                this.logResponse(`Postings of group '${groupId}' have been fetched`, response);

                postings = ApiHandler.parsePostingArray(response.data);
            })
            .catch(error => {
                this.logErrorResponse(
                    `An error occurred on the request for the postings of group '${groupId}'`,
                    error.response);
            });

        return postings;
    }

    /**
     * Queries the api and returns the Posting object with the specified id.
     * In case an error occurred, an empty Posting is returned.
     * @param postingId {string} id of the posting to retrieve
     * @return {Promise<Posting | Posting.EMPTY>}
     */
    async getPosting(postingId) {
        let posting = Posting.EMPTY;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/${postingId}`
        await axios.get(routeUrl)
            .then(response => {
                this.logResponse(`Posting with id '${postingId}' has been fetched`, response);

                const resData = response.data;
                const contactData = response.data.contact;
                const postingData = {
                    id: resData.user_id,
                    groupId: resData .user_id,
                    name: resData.name,
                    category: resData.category,
                    description: resData.description,
                    photo: resData.photo,
                    type: resData.type,
                    contact: new Contact({
                        email: contactData.email,
                        place: contactData.place,
                        phoneNumber: contactData.phone_number
                    })
                };
                posting = new Posting(response.data);
            })
            .catch(error => {
                this.logErrorResponse(
                    `An error occurred on the request for the Posting with id '${postingId}'`,
                    error.response);
            });

        return posting;
    }

    /**
     * Queries the api and creates a new Posting based on the information provided as argument.
     * The created Posting is then returned.
     * In case an error occurred, an empty Posting is returned instead.
     * @param userId {string} user that creates the posting
     * @param groupId {string} group that the posting is created on
     * @param info {PostingInfo} information to create the posting with
     * @return {Promise<Posting | Posting.EMPTY>}
     */
    async createPosting(userId, groupId, info) {
        const creationData = {
            user_id: userId, // TODO quindi non devo più passarli qui ma nella route?
            group_id: groupId,
            ...info
        };

        let posting = Posting.EMPTY;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/`;
        await axios.post(routeUrl, creationData)
            .then(response => {
                this.logResponse(`Posting created with id ${response.data.id}`, response);

                posting = new Posting(response.data);
            })
            .catch(error => {
                this.logErrorResponse(
                    `Error while creating posting for user: ${userId}, group: ${groupId}`,
                    error.response);
                Log.error('Creation data: ' + JSON.stringify(creationData, null, 4));
            });

        return posting;
    }

    /**
     * Queries the api and edits an existing Posting with the provided id,
     * based on the information provided as argument.
     * Returns true if the edit was successful, false otherwise.
     * @param idToEdit {string} id of the posting to edit
     * @param newInfo {PostingInfo} information to edit the Posting with.
     * @return {Promise<boolean>}
     */
    async editPosting(idToEdit, newInfo) {
        let success = false;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/${idToEdit}`;
        await axios.patch(routeUrl, newInfo)
            .then(response => {
                this.logResponse(`Posting with id ${idToEdit} has been edited`, response);

                success = true;
            })
            .catch(error => {
                this.logErrorResponse(`Error while editing posting with id ${idToEdit}`,
                    error.response);
                Log.error('Editing data: ' + JSON.stringify(newInfo, null, 4));
            });

        return success;
    }

    /**
     * Queries the api and deletes an existing Posting with the provided id.
     * If the deletion was successful, true is returned, false otherwise.
     * @param postingId {string} id of the posting to delete
     * @return {Promise<boolean>}
     */
    async deletePosting(postingId) {
        let success = false;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/${postingId}`;
        await axios.delete(routeUrl)
            .then(response => {
                this.logResponse(`Posting with id ${response.data.id} has been deleted`, response);

                success = true;
            })
            .catch(error => {
                this.logErrorResponse(`Error while deleting posting with id ${postingId}`,
                    error.response);
            });

        return success;
    }

    /**
     * Queries the api and returns information about all the groups the user belongs to.
     * In case an error occurred, returns an empty array instead.
     * @param userId {string} user to retrieve the postings of
     * @return {Promise<GroupInfo[] | []>}
     */
    async getUserGroups(userId) {
        const groupInfos = [];
        const routeUrl = `${ApiHandler.FS_API_BASE_URL}/users/${userId}/groups`;
        await axios.get(routeUrl)
            .then(async response => {
                this.logResponse(`Group ids for user '${userId}' has been fetched`, response);

                for (const item of response.data) {
                    const groupId = item.group_id;
                    const info = await this.getGroupInfo(groupId);
                    groupInfos.push(info);
                }
            })
            .catch(error => {
                this.logErrorResponse(`Error while fetching group infos for user '${userId}'`,
                    error.response);
            });

        return groupInfos;
    }

    /**
     * Queries the api and returns information about the specified group.
     * In case an error occurred, an empty group is returned instead.
     * @param groupId {string} group to retrieve the information of
     * @return {Promise<GroupInfo | GroupInfo.EMPTY>}
     */
    async getGroupInfo(groupId) {
        let groupInfo = GroupInfo.EMPTY;

        // This is an endpoint of Families Share, not Family Market
        const routeUrl = `${ApiHandler.FS_API_BASE_URL}/groups/${groupId}`;
        await axios.get(routeUrl)
            .then(async response => {
                this.logResponse(`Group info for id '${groupId}' has been fetched`, response);

                const groupData = response.data;
                groupInfo = new GroupInfo({
                    id: groupData.group_id,
                    name: groupData.name
                });
            })
            .catch(error => {
                this.logErrorResponse(`Error while fetching group info for id '${groupId}'`,
                    error.response);
            });

        return groupInfo;
    }

    /**
     * Queries the api and returns all the postings created by the specified user.
     * In case an error occurred, an empty array is returned instead.
     * @param userId {string} user to retrieve the postings of
     * @param groupId {string} group to retrieve the user's postings of
     * @return {Promise<Posting[] | []>}
     */
    async getUserPostings(userId, groupId) {
        let postings = [];
        const routeUrl = `${ApiHandler.USERS_BASE_URL}/${userId}/groups/${groupId}/postings`;
        await axios.get(routeUrl)
            .then(response => {
                this.logResponse(`Postings of user '${userId}' in group '${groupId}' have been fetched`,
                    response)

                // Response data is an array of postings
                postings = ApiHandler.parsePostingArray(response.data);
            })
            .catch(error => {
                this.logErrorResponse("An error occurred on the request" +
                    `for the postings of user '${userId}' in group '${groupId}'`, error.response);
            });

        return postings;
    }

    /**
     * Queries the api and returns an array of Posting objects that
     * were marked as favourites by the specified user.
     * In case an error occurred, an empty array is returned.
     * @param userId {string} user to fetch the favourite postings of
     * @return {Promise<Posting[] | []>}
     */
    async getUserFavouritePostings(userId) {
        // First make a request for the user's favourite postings ids
        const favouritesIds = await this.getUserFavouritesIds(userId);

        // After having fetched the ids,
        // fetch the individual postings and then return them
        const favouritePostings = [];
        for (const favId of favouritesIds) {
            const p = await this.getPosting(favId);
            favouritePostings.push(p);
        }

        return favouritePostings;
    }

    /**
     * Queries the api and returns an array containing the ids of the postings that
     * were marked as favourites by the specified user.
     * In case an error occurred, an empty array is returned.
     * @param userId {string} user to fetch the favourite postings ids of
     * @return {Promise<string[] | []>}
     */
    async getUserFavouritesIds(userId) {
        const favouritesIds = [];
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/users/${userId}/favourites`
        await axios.get(routeUrl)
            .then(response => {
                this.logResponse(`Favourite ids of user '${userId}' have been fetched`, response);

                const favList = response.data;
                for (const favId of favList) {
                    favouritesIds.push(favId);
                }
            })
            .catch(error => {
                this.logErrorResponse(`An error occurred on the request for the 
                favourite ids of user '${userId}'`, error.response);
            });

        return favouritesIds;
    }

    /**
     * Returns true if the specified posting is marked as favourite by the specified user,
     * false otherwise.
     * @param userId {string}
     * @param postingId {string}
     * @return {Promise<boolean>}
     */
    async isUserFavourite(userId, postingId) {
        const favouriteIds = await this.getUserFavouritesIds(userId);

        return favouriteIds.includes(postingId);
    }

    /**
     * Adds the provided posting to the specified user's favourites list.
     * Returns true if the operation was successful,
     * false in case an error occurred or the posting was already a favourite.
     * @param userId {string}
     * @param postingId {string}
     * @return {Promise<boolean>}
     */
    async addUserFavourite(userId, postingId) {
        let success = true;
        const favouriteIds = await this.getUserFavouritesIds(userId);

        if (favouriteIds.includes(postingId)) {
            // Nothing to do, operation successful
            return success;
        }
        else {
            // Edit the list by adding the id
            // success depends on the edit operation
            favouriteIds.push(postingId);
            success = await this.editUserFavourites(userId, favouriteIds);
        }

        return success;
    }

    /**
     * Removes the provided posting from the specified user's favourites list.
     * Returns true if the operation was successful,
     * false in case an error occurred or the posting wasn't a favourite to begin with.
     * @param userId {string}
     * @param postingId {string}
     * @return {Promise<boolean>}
     */
    async removeUserFavourite(userId, postingId) {
        let success = false;
        const favouriteIds = await this.getUserFavouritesIds(userId);

        const index = favouriteIds.indexOf(postingId);
        if (index === -1) {
            // PostingId not in the list, return false
            return success;
        }
        else {
            // Edit the list by removing the id
            // success depends on the edit operation
            favouriteIds.splice(index, 1);
            success = await this.editUserFavourites(userId, favouriteIds);
        }

        return success;
    }

    /**
     * Queries the api and updates the postings that the specified user marked as favourite.
     * Returns true if the edit was successful, false otherwise.
     * @param userId {string} user to edit the favourite postings of
     * @param newFavouritesIds {string[]} updated ids of the postings the user marked as favourite
     * @return {Promise<boolean>}
     */
    async editUserFavourites(userId, newFavouritesIds) {
        let success = false;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/users/${userId}/favourites`
        const data = {
            favourites: newFavouritesIds
        };
        await axios.patch(routeUrl, data)
            .then(response => {
                this.logResponse(`Favourite postings of user '${userId}' have been edited`, response);

                success = true;
            })
            .catch(error => {
                this.logErrorResponse(`An error occurred on the request for the 
                favourite postings of user '${userId}'`, error.response);
            });

        return success;
    }

    /**
     * Parses an array of objects coming from an api response and returns
     * the corresponding Posting objects.
     * @param responseData
     * @return {Posting[]}
     */
    static parsePostingArray(responseData) {
        const postings = []
        for (const item of responseData) {
            const p = new Posting(item);
            postings.push(p);
        }

        return postings;
    }

    /**
     * Logs an axios response to the app logger, only if the object was instantiated
     * with the log option enabled.
     * @param response
     */
    logResponse(response) {
        if(this.log === null || this.log === undefined)
        {
            return;
        }

        this.logResponseInternal("Response data: ", response, this.log.info);
    }

    /**
     * Logs an axios error response to the app logger,
     * only if the object was instantiated with a valid logger.
     * @param errResponse
     */
    logErrorResponse(errResponse) {
        if(this.log === null || this.log === undefined)
        {
            return;
        }

        this.logResponseInternal("Error response data:", errResponse, this.log.error);
    }

    /**
     * Calls the provided log function with the provided parameters
     *
     * @param message {string}
     * @param response {Object}
     * @param logHandler {function}
     */
    logResponseInternal(message, response, logHandler) {
        if (response === null || response === undefined) {
            return;
        }

        const logData = {
            Status: response.status,
            StatusText: response.statusText,
            Data: response.data
        }

       // const config = response.config;
       // if (config !== null && config !== undefined) {
       //     logData.RequestUrl = config.url;
       //     logData.Method = config.method;
       // }

        logHandler(`${message} \n` + JSON.stringify(logData, null, 4), this);
    }
}

export default ApiHandler;
