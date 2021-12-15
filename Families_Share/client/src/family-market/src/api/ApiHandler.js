import Posting from "./model/Posting";
import GroupInfo from "./model/GroupInfo";
import PostingInfo from "./model/PostingInfo";
import Contact from "./model/Contact";
import {stringify, Log} from "../utils";
import axios from "axios";


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
     * @param debug {boolean} If true, console is used to log debug data.
     * @param authToken {string} Token used to authenticate the user that makes the requests.
     *      Set in the AUTHORIZATION field of the request header.
     */
    constructor(authToken="", debug=true) {
        // TODO might want to add a baseUrl parameter which is useful during testing,
        //      where proxying to localhost:4000 doesn't work

        if (authToken !== "") {
            // Set default auth header with the token of the user that makes the requests
            // this is necessary because the server checks if the user is authenticated
            // by verifying the token
            axios.defaults.headers.common["Authorization"] = authToken;
        }

        this.debug = debug;

        this.getGroupPostings = this.getGroupPostings.bind(this);

        this.getPosting = this.getPosting.bind(this);
        this.createPosting = this.createPosting.bind(this);
        this.editPosting = this.editPosting.bind(this);
        this.deletePosting = this.deletePosting.bind(this);

        this.getUserGroups = this.getUserGroups.bind(this);
        this.getGroupInfo = this.getGroupInfo.bind(this);

        this.getUserPostings = this.getUserPostings.bind(this);

        this.getUserFavouritePostings = this.getUserFavouritePostings.bind(this);
        this.getUserFavouritesIds = this.getUserFavouritesIds.bind(this);
        this.isUserFavourite = this.isUserFavourite.bind(this);
        this.addUserFavourite = this.addUserFavourite.bind(this);
        this.removeUserFavourite = this.removeUserFavourite.bind(this);
        this.editUserFavourites = this.editUserFavourites.bind(this);

        this.logError = this.logError.bind(this);
        this.logSuccessResponse = this.logSuccessResponse.bind(this);
        this.logErrorResponse = this.logErrorResponse.bind(this);
        this.logResponseInternal = this.logResponseInternal.bind(this);
        this.logMessage = this.logMessage.bind(this);
    }

    /**
     * Families Share (original) base url for the api
     * @return {string}
     */
    static get FS_API_BASE_URL() {
        return "/api";
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
     * @return {Promise<Posting[]>} array of postings belonging to the group or empty array.
     */
    async getGroupPostings(groupId) {
        let postings = [];
        const routeUrl = `${ApiHandler.GROUPS_BASE_URL}/${groupId}/postings`
        await axios.get(routeUrl)
            .then(response => {
                this.logSuccessResponse(`Postings of group '${groupId}' have been fetched`, response);

                postings = ApiHandler.parsePostingArray(response.data);
            })
            .catch(error => {
                this.logErrorResponse(
                    `An error occurred on the request for the postings of group '${groupId}'`,
                    error.response);
                this.logError(error);
            });

        return postings;
    }

    /**
     * Queries the api and returns the Posting object with the specified id.
     * In case an error occurred, an empty Posting is returned.
     * @param postingId {string} id of the posting to retrieve
     * @return {Promise<Posting>}
     */
    async getPosting(postingId) {
        let posting = Posting.EMPTY;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/${postingId}`
        await axios.get(routeUrl)
            .then(response => {
                this.logSuccessResponse(`Posting with id '${postingId}' has been fetched`, response);

                posting = new Posting(response.data);
            })
            .catch(error => {
                this.logErrorResponse(
                    `An error occurred on the request for the Posting with id '${postingId}'`,
                    error.response);
                this.logError(error);
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
     * @return {Promise<Posting>}
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
                this.logSuccessResponse(`Posting created with id ${response.data.id}`, response);

                posting = new Posting(response.data);
            })
            .catch(error => {
                this.logErrorResponse(
                    `Error while creating posting for user: ${userId}, group: ${groupId}`,
                    error.response);
                this.logMessage('Creation data: ' + stringify(creationData));
                this.logError(error);
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
                this.logSuccessResponse(`Posting with id ${idToEdit} has been edited`, response);

                success = true;
            })
            .catch(error => {
                this.logErrorResponse(`Error while editing posting with id ${idToEdit}`,
                    error.response);
                this.logMessage('Editing data: ' + stringify(newInfo));
                this.logError(error);
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
                this.logSuccessResponse(`Posting with id ${response.data.id} has been deleted`, response);

                success = true;
            })
            .catch(error => {
                this.logErrorResponse(`Error while deleting posting with id ${postingId}`,
                    error.response);
                this.logError(error);
            });

        return success;
    }

    /**
     * Queries the api and returns information about all the groups the user belongs to.
     * In case an error occurred, returns an empty array instead.
     * @param userId {string} user to retrieve the postings of
     * @return {Promise<GroupInfo[]>}
     */
    async getUserGroups(userId) {
        const groupInfos = [];
        const routeUrl = `${ApiHandler.FS_API_BASE_URL}/users/${userId}/groups`;
        await axios.get(routeUrl)
            .then(async response => {
                this.logSuccessResponse(`Group ids for user '${userId}' has been fetched`, response);

                for (const item of response.data) {
                    const groupId = item.group_id;
                    const info = await this.getGroupInfo(groupId);
                    groupInfos.push(info);
                }
            })
            .catch(error => {
                this.logErrorResponse(`Error while fetching group infos for user '${userId}'`,
                    error.response);
                this.logError(error);
            });

        return groupInfos;
    }

    /**
     * Queries the api and returns information about the specified group.
     * In case an error occurred, an empty group is returned instead.
     * @param groupId {string} group to retrieve the information of
     * @return {Promise<GroupInfo>}
     */
    async getGroupInfo(groupId) {
        let groupInfo = GroupInfo.EMPTY;

        // This is an endpoint of Families Share, not Family Market
        const routeUrl = `${ApiHandler.FS_API_BASE_URL}/groups/${groupId}`;
        await axios.get(routeUrl)
            .then(async response => {
                this.logSuccessResponse(`Group info for id '${groupId}' has been fetched`, response);

                const groupData = response.data;
                groupInfo = new GroupInfo({
                    id: groupData.group_id,
                    name: groupData.name
                });
            })
            .catch(error => {
                this.logErrorResponse(`Error while fetching group info for id '${groupId}'`,
                    error.response);
                this.logError(error);
            });

        return groupInfo;
    }

    /**
     * Queries the api and returns all the postings created by the specified user.
     * In case an error occurred, an empty array is returned instead.
     * @param userId {string} user to retrieve the postings of
     * @param groupId {string} group to retrieve the user's postings of
     * @return {Promise<Posting[]>}
     */
    async getUserPostings(userId, groupId) {
        let postings = [];
        const routeUrl = `${ApiHandler.USERS_BASE_URL}/${userId}/groups/${groupId}/postings`;
        await axios.get(routeUrl)
            .then(response => {
                this.logSuccessResponse(`Postings of user '${userId}' in group '${groupId}' have been fetched`,
                    response);

                // Response data is an array of postings
                postings = ApiHandler.parsePostingArray(response.data);
            })
            .catch(error => {
                this.logErrorResponse("An error occurred on the request" +
                    `for the postings of user '${userId}' in group '${groupId}'`, error.response);
                this.logError(error);
            });

        return postings;
    }

    /**
     * Queries the api and returns an array of Posting objects that
     * were marked as favourites by the specified user.
     * In case an error occurred, an empty array is returned.
     * @param userId {string} user to fetch the favourite postings of
     * @return {Promise<Posting[]>}
     */
    async getUserFavouritePostings(userId) {
        const favouritePostings = [];
        const routeUrl = `${ApiHandler.USERS_BASE_URL}/${userId}/favourites`
        await axios.get(routeUrl)
            .then(response => {
                this.logSuccessResponse(`Favourite postings of user '${userId}' have been fetched`,
                    response);

                const postingsData = response.data;
                for (const pData of postingsData) {
                    const favPosting = new Posting(pData);
                    favouritePostings.push(favPosting);
                }
            })
            .catch(error => {
                this.logErrorResponse(`An error occurred on the request for the 
                favourite ids of user '${userId}'`, error.response);
                this.logError(error);
            });

        return favouritePostings;
    }

    /**
     * Queries the api and returns an array containing the ids of the postings that
     * were marked as favourites by the specified user.
     * In case an error occurred, an empty array is returned.
     * @param userId {string} user to fetch the favourite postings ids of
     * @return {Promise<string[]>}
     */
    async getUserFavouritesIds(userId) {
        // First make a request for the user's favourite postings ids
        const favouritePostings = await this.getUserFavouritePostings(userId);
        return favouritePostings.map(p => p.id);
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
        let success = false;
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
        const routeUrl = `${ApiHandler.USERS_BASE_URL}/${userId}/favourites`
        const data = {
            favourites: newFavouritesIds
        };
        await axios.patch(routeUrl, data)
            .then(response => {
                this.logSuccessResponse(`Favourite postings of user '${userId}' have been edited`, response);

                success = true;
            })
            .catch(error => {
                this.logErrorResponse(`An error occurred on the request for the 
                favourite postings of user '${userId}'`, error.response);
                this.logError(error);
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
     * Logs a generic error,
     * only if the debug attribute of this instance was set to true
     * @param error {Error}
     */
    logError(error) {
        this.logMessage("Error caught: " + stringify({
            name: error.name,
            message: error.message,
            lineNumber: error.lineNumber,
            stack: error.stack
        }), Log.error);
    }

    /**
     * Logs an axios successful response,
     * only if the debug attribute of this instance was set to true
     * @param message {string}
     * @param response {Object}
     */
    logSuccessResponse(message, response) {
        if(!this.debug)
        {
            return;
        }

        this.logResponseInternal(message, response, Log.info);
    }

    /**
     * Logs an axios error response,
     * only if the debug attribute of this instance was set to true
     * @param message {string}
     * @param errResponse {Object}
     */
    logErrorResponse(message, errResponse) {
        if(!this.debug)
        {
            return;
        }

        this.logResponseInternal("Error response data:", errResponse, Log.error);
    }

    /**
     * Logs an axios response,
     * only if the debug attribute of this instance was set to true.
     *
     * @param message {string}
     * @param response {Object}
     * @param logHandler {function(string)} function that logs the provided message
     */
    logResponseInternal(message, response, logHandler) {
        if (response === null || response === undefined) {
            return;
        }

        const logData = {}
        const config = response.config;
        if (config !== null && config !== undefined) {
            logData.RequestUrl = config.url;
            logData.Method = config.method;
        }

        logData.Status = response.status;
        logData.StatusText = response.statusText;
        logData.Data = response.data;

        this.logMessage(`${message} \n` + stringify(logData), logHandler);
    }

    /**
     * Logs a message to the console,
     * only if the debug attribute of this instance was set to true.
     * @param message {string} message to be printed
     * @param logHandler {function(string)} function that logs the provided message
     */
    logMessage(message, logHandler) {
        if(!this.debug) {
            return;
        }

        logHandler(message);
    }
}

export default ApiHandler;
