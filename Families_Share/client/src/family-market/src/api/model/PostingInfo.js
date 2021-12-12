import Contact from "./Contact";


/**
 * Class used to represent the necessary information to create/edit a posting.
 * It is used to map certain json request/response data to/from the api.
 */
class PostingInfo {
    /**
     * Name of the posting
     * @type {string}
     */
    name = "";

    /**
     * Category of the posting
     * @type {string}
     */
    category = "";

    /**
     * Description of the posting
     * @type {string}
     */
    description = "";

    /**
     * Base64 image data about the posting's photo
     * @type {string}
     */
    photo = "";

    /**
     * Type of the transaction proposed in the posting
     * @type {string}
     */
    type = "";

    /**
     * Contact information of the posting
     * @type {Contact}
     */
    contact = Contact.EMPTY;

    /**
     *
     * @param name {string}
     * @param category {string}
     * @param description {string}
     * @param photo {string} Base64 image data about the posting's photo
     * @param type {string} Type of the transaction proposed in the posting
     * @param contact {Contact} Contact information of the posting
     */
    constructor({name, category, description,
                    photo, type, contact}) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.photo = photo;
        this.type = type;
        this.contact = contact;
    }

    /**
     *
     * @return {PostingInfo}
     */
    static get EMPTY() {
        const empty = {
            name:"",
            category:"",
            description:"",
            photo:"",
            type:"",
            contact : Contact.EMPTY
        }

        return new PostingInfo(empty);
    }
}

export default PostingInfo;
