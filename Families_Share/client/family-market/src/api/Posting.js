const PostingInfo = require("./PostingInfo");
const Contact = require("./Contact");

/**
 * Class representing a posting present in the database.
 * It is used to map certain json request/response data to/from the api.
 */
class Posting extends PostingInfo{
    /*
     * Note: nomenclature has to be the same as that defined in the Api docs,
     * which means that snake_case is used instead of lowerCamelCase.
     * This is so the api can accept this object when it is automatically converted
     * to json by axios, and no remapping is needed.
     */

    /**
     * Id of the posting
     * @type {string}
     */
    id = "";


    /**
     * Id of the group the posting belongs to.
     *
     * @type {string}
     */
    group_id = "";

    constructor({id="", groupId="",
                    name="", category="", description="",
                    photo="", type="",
                    contact = Contact.EMPTY} = {}) {
        super(arguments[0]);

        this.id = id;
        this.group_id = groupId;
    }

    static get EMPTY() {
        return new Posting();
    }
}

module.exports = Posting;