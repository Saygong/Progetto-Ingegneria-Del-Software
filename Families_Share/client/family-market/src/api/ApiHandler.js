const Posting = require("./Posting")
const PostingInfo = require("./PostingInfo")
const GroupInfo = require("./GroupInfo")
import axios from "axios";
import Log from "../../../src/components/Log";

/**
 * Class for handling requests and responses to/from the server side api
 * relative to the Family Market extension.
 */
class FamilyMarketApiHandler {
    FM_API_BASE_URL = "/api/family-market";
    POSTINGS_BASE_URL = `${this.FM_API_BASE_URL}/postings`;
    USER_EXT_BASE_URL = `${this.FM_API_BASE_URL}/users`;

    /**
     * Queries the api and returns a list of Posting objects belonging to the specified group
     * @param groupId {string} id of the group
     * @return {list<Posting>} list of postings belonging to the group
     */
    getGroupPostings(groupId) {
        let routeUrl = `${this.POSTINGS_BASE_URL}/groups/${groupId}`
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

    editPosting(newInfo) {

    }

    deletePosting(postingId) {

    }

    getUserPostings(userId) {

    }

    getUserFavouritePostings(userId) {

    }

    editUserFavourites(userId, newFavouritesIds) {

    }
}

module.exports = FamilyMarketApiHandler
