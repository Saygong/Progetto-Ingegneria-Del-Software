const Posting = require("./Posting")
const PostingInfo = require("./PostingInfo")
const GroupInfo = require("./GroupInfo")
const PostingsWithGroupInfo = require("./PostingsWithGroupInfo")
import axios from "axios";
import Log from "../../../src/components/Log";

// TODO capire come va gestito il "data:image/<format>;base64,".
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
// questo si occupa già di aggiungere i metadati (data:image... ecc.) e prende come argomento
// un blob, che è quello che viene restituito da componenti html che accettano un file
// (vedi react dropzone). Tu gli passi il blob e lui converte.
// Di più su questo tutorial:
// https://medium.com/js-dojo/how-to-upload-base64-images-in-vue-nodejs-4e89635daebc
// For image compression:
// https://stackoverflow.com/questions/14672746/how-to-compress-an-image-via-javascript-in-the-browser

/**
 * Class for handling requests and responses to/from the server side api
 * relative to the Family Market extension.
 */
class ApiHandler {
    /* NOTE:
     * The policy of Families Share with regards to wrong api calls or api errors seems to be:
     * - client side, just to log the error, without throwing any exception or returning null values.
     *      Instead, objects with empty properties are returned.
     * - server side, to return an appropriate error code.
     * The behaviour of Family Market will be the same.
     */

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
     * Queries the api and returns a list of Posting objects belonging to the specified group
     * @param groupId {string} id of the group
     * @return {Array<Posting>} list of postings belonging to the group
     */
    getGroupPostings(groupId) {
        let routeUrl = `${ApiHandler.POSTINGS_BASE_URL}/groups/${groupId}`
        return axios
            .get(routeUrl)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                Log.error(error);
                return [];
            });
    }

    getPosting(postingId) {

    }

    createPosting(userId, groupId, info) {

    }

    editPosting(idToEdit, newInfo) {

    }

    deletePosting(postingId) {

    }

    /**
     *
     * @param userId
     * @return {Array<PostingsWithGroupInfo>}
     */
    getUserPostings(userId) {

    }

    /**
     *
     * @param userId
     * @return {Array<Posting>}
     */
    getUserFavouritePostings(userId) {

    }

    /**
     *
     * @param userId {string}
     * @param newFavouritesIds {Array<string>}
     * @return {Array<string>}
     */
    editUserFavourites(userId, newFavouritesIds) {

    }
}

module.exports = ApiHandler
