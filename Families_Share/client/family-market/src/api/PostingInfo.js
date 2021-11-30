const Contact = require("./Contact");

/**
 *
 */
class PostingInfo {
    name = "";
    category = "";
    description = "";
    photoSrc = null;
    type = "";
    contact = null;

    /**
     *
     * @param name {string} name of the posting
     * @param category {string} category of the posting
     * @param description {string} description of the posting
     * @param photoSrc {string} base64 image data
     * @param type
     * @param contact {Contact}
     */
    constructor(name, category, description, photoSrc, type, contact) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.photoSrc = "data:image/jpg;base64," + photoSrc;
        this.type = type;
        this.contact = contact;
    }
}

module.exports = PostingInfo;