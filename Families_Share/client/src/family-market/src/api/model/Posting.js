const PostingInfo = require("./PostingInfo");
const Contact = require("./Contact");

/**
 * Class representing a posting present in the database.
 * It is used to map certain json request/response data to/from the api.
 */
class Posting extends PostingInfo {
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
     * Id of the user that created the posting
     * @type {string}
     */
    user_id = ""; // TODO updated tests to include this property

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

    /**
     *
     * @return {Posting}
     */
    static get EMPTY() {
        return new Posting();
    }

    /**
     * Needed because JSON.stringify does not count inherited fields, which means that
     * passing a Posting instance to an axios request will not include all the properties.
     *
     * @return {{user_id: string, group_id: string, contact: Contact, name: string,
     * description: string, photo: string, id: string, category: string, type: string}}
     */
    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            group_id: this.group_id,
            name: this.name,
            category: this.category,
            description: this.description,
            photo: this.photo,
            type: this.type,
            contact: this.contact
        };
    }
}

export default Posting;