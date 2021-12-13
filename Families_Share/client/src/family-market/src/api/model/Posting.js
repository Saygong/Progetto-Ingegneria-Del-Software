import PostingInfo from "./PostingInfo";
import Contact from "./Contact";

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
    user_id = "";

    /**
     * Id of the group the posting belongs to.
     *
     * @type {string}
     */
    group_id = "";

    /**
     *
     * @param id {string}
     * @param user_id {string}
     * @param group_id {string}
     * @param name {string}
     * @param category {string}
     * @param description {string}
     * @param photo {string}
     * @param type {string}
     * @param contact {Contact}
     */
    constructor({ id, user_id, group_id, name, category, description,
                    photo, type, contact}) {
        super(arguments[0]);

        this.id = id;
        this.user_id = user_id;
        this.group_id = group_id;
    }

    /**
     *
     * @return {Posting}
     */
    static get EMPTY() {
        const empty = {
            id:"",
            user_id: "",
            group_id:"",
            name:"",
            category:"",
            description:"",
            photo:"",
            type:"",
            contact : Contact.EMPTY
        };

        return new Posting(empty);
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
