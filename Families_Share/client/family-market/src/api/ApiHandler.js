const Posting = require("./model/Posting")
const PostingInfo = require("./model/PostingInfo")
const GroupInfo = require("./model/GroupInfo")
const PostingsWithGroupInfo = require("./model/PostingsWithGroupInfo")
const axios = require("axios");
const Log = require( "../../../src/components/Log");

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
 * The policy of Families Share with regards to wrong api calls or api errors seems to be:
 * - client side, just to log the error, without throwing any exception or returning null values.
 *      Instead, objects with empty properties are returned.
 * - server side, to return an appropriate error code.
 * The policy adopted in Family Market and in this class will be the same.
 */
class ApiHandler {
    constructor() {
        this.getGroupPostings = this.getGroupPostings.bind(this);
        this.getPosting = this.getPosting.bind(this);
        this.createPosting = this.createPosting.bind(this);
        this.editPosting = this.editPosting.bind(this);
        this.deletePosting = this.deletePosting.bind(this);
        this.getUserPostings = this.getUserPostings.bind(this);
        this.getUserFavouritePostings = this.getUserFavouritePostings.bind(this);
        this.editUserFavourites = this.editUserFavourites.bind(this);
    }


    static get FM_API_BASE_URL() {
        return "/api/family-market";
    }
    static get POSTINGS_BASE_URL() {
        return `${ApiHandler.FM_API_BASE_URL}/postings`;
    }
    static get USER_EXT_BASE_URL() {
        return `${ApiHandler.FM_API_BASE_URL}/users`;
    }

    /**
     * Queries the api and returns an array of Posting objects belonging to the specified group.
     * In case an error occurred, an empty array is returned.
     * @param groupId {string} id of the group
     * @return {Promise<Posting[]> | Promise<[]>} array of postings belonging to the group or empty array.
     */
    async getGroupPostings(groupId) {
        const postings = [];
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/groups/${groupId}`
        await axios.get(routeUrl)
            .then(response => {
                Log.info(`Postings of group '${groupId}' have been fetched`, this);
                Log.info(response, this);

                for (const item of response.data) {
                    const p = new Posting(item);
                    postings.push(p);
                }
            })
            .catch(error => {
                Log.error(`An error occurred on the request for the postings of group '${groupId}'`, this);
                Log.error(error, this);
            });

        return postings;
    }

    /**
     * Queries the api and returns the Posting object with the specified id.
     * In case an error occurred, an empty Posting is returned.
     * @param postingId {string} id of the posting to retrieve
     * @return {Promise<Posting> | Promise<Posting.EMPTY>}
     */
    async getPosting(postingId) {
        let posting = Posting.EMPTY;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/${postingId}`
        await axios.get(routeUrl)
            .then(response => {
                Log.info(`Posting with id '${postingId}' has been fetched`, this);
                Log.info(response, this);

                posting = new Posting(response.data);
            })
            .catch(error => {
                Log.error(`An error occurred on the request for the Posting with id '${postingId}'`, this);
                Log.error(error, this);
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
     * @return {Promise<Posting> | Promise<Posting.EMPTY>}
     */
    async createPosting(userId, groupId, info) {
        const creationData = {
            user_id: userId,
            group_id: groupId,
            ...info
        };

        let posting = Posting.EMPTY;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/`;
        await axios.post(routeUrl, creationData)
            .then(response => {
                Log.info(`Posting created with id ${response.data.id}`, this);
                Log.info(response, this);

                posting = new Posting(response.data);
            })
            .catch(error => {
                Log.error(`Error while creating posting for user: ${userId}, group: ${groupId}`, this);
                Log.error('Creation data: ' + creationData);
                Log.error(error, this);
            });

        return posting;
    }

    /**
     * Queries the api and edits an existing Posting with the provided id,
     * based on the information provided as argument.
     * The Posting with the edited information is then returned.
     * In case an error occurred, an empty Posting is returned instead.
     * @param idToEdit {string} id of the posting to edit
     * @param newInfo {PostingInfo} information to edit the Posting with.
     * @return {Promise<Posting> | Promise<Posting.EMPTY>}
     */
    async editPosting(idToEdit, newInfo) {
        let editedPosting = Posting.EMPTY;
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/${idToEdit}`;
        await axios.patch(routeUrl, newInfo)
            .then(response => {
                Log.info(`Posting with id ${idToEdit} has been edited`, this);
                Log.info(response, this);

                editedPosting = new Posting(response.data);
            })
            .catch(error => {
                Log.error(`Error while editing posting with id ${idToEdit}`, this);
                Log.error('Editing data: ' + newInfo);
                Log.error(error, this);
            });

        return editedPosting;
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
                Log.info(`Posting with id ${response.data.id} has been deleted`, this);
                Log.info(response, this);

                success = true;
            })
            .catch(error => {
                Log.error(`Error while deleting posting with id ${postingId}`, this);
                Log.error(error, this);
            });

        return success;
    }

    /**
     * Queries the api and returns information about all the groups the user belongs to.
     * @param userId {string} user to retrieve the postings of
     * @return {Promise<GroupInfo[]> | Promise<[]>}
     */
    async getUserGroupsInfo(userId) {
        // TODO e scrivi anche i test
    }

    /**
     * Queries the api and returns all the postings created by the specified user.
     * In case an error occurred, an empty array is returned instead.
     * @param userId {string} user to retrieve the postings of
     * @param groupId {string} group to retrieve the user's postings of
     * @return {Promise<Posting[]> | Promise<[]>}
     */
    async getUserPostings(userId, groupId) {
        // TODO qui va cambiato perché ora questo metodo ritorna solo i post dell'utente per quello specifico gruppo
        //      "/users/:id/groups/:groupId/postings"
        const postingsByGroup = [];
        const routeUrl = `${ApiHandler.USER_EXT_BASE_URL}/users/${userId}/postings`;
        await axios.get(routeUrl)
            .then(response => {
                Log.info(`Postings of user '${userId}' have been fetched`, this);
                Log.info(response, this);

                // Data is divided by group, so we first get the group info
                // and then we get each posting of the group
                for (const item of response.data) {
                    const info = new GroupInfo(item.group_info);

                    const postings = [];
                    for (const p of item.postings) {
                        const posting = new Posting(p);
                        postings.push(posting);
                    }

                    const pg = new PostingsWithGroupInfo({groupInfo: info, postings: postings});
                    postingsByGroup.push(pg);
                }
            })
            .catch(error => {
                Log.error(`An error occurred on the request for the postings of user '${userId}'`, this);
                Log.error(error, this);
            });

        return postingsByGroup;
    }


    /**
     * Queries the api and returns an array of Posting objects that
     * were marked as favourites by the specified user.
     * In case an error occurred, an empty array is returned.
     * @param userId {string} user to fetch the favourite postings of
     * @return {Promise<Posting[]> | Promise<[]>}
     */
    async getUserFavouritePostings(userId) {
        // First make a request for the user's favourite postings ids
        const favouritesIds = [];
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/users/${userId}/favourites`
        await axios.get(routeUrl)
            .then(response => {
                Log.info(`Favourite postings of user '${userId}' have been fetched`, this);
                Log.info(response, this);

                for (const favId of response.data.favourites) {
                    favouritesIds.push(favId);
                }
            })
            .catch(error => {
                Log.error(`An error occurred on the request for the 
                favourite postings of user '${userId}'`, this);

                Log.error(error, this);
            });

        // After having fetched the ids,
        // fetch the individual postings and then return them
        const favouritePostings = [];
        for (const favId of favouritesIds) {
            // TODO: potenzialmente implementare un metodo che raggruppa più id da fetchare
            // in modo da fare una sola chiamata al server invece che n.
            const p = this.getPosting(favId);
            favouritePostings.push(p);
        }

        return favouritePostings;
    }

    /**
     * Queries the api and updates the postings that the specified user marked as favourite.
     * If the edit was successful, an array containing the updated favourite postings ids is returned.
     * In case an error occurred, an empty array is returned instead.
     * @param userId {string} user to edit the favourite postings of
     * @param newFavouritesIds {string[]} updated ids of the postings the user marked as favourite
     * @return {Promise<string[]> | Promise<[]>}
     */
    async editUserFavourites(userId, newFavouritesIds) {
        const data = {
            favourites: newFavouritesIds
        };

        const favouritesFromResponse = []
        const routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/users/${userId}/favourites`
        await axios.put(routeUrl, data)
            .then(response => {
                Log.info(`Favourite postings of user '${userId}' have been edited`, this);
                Log.info(response, this);

                for (const favId of response.data.favourites) {
                    favouritesFromResponse.push(favId);
                }
            })
            .catch(error => {
                Log.error(`An error occurred on the request for the 
                favourite postings of user '${userId}'`, this);

                Log.error(error, this);
            });

        return favouritesFromResponse;
    }
}

module.exports = ApiHandler;
