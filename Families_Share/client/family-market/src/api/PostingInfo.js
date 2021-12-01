const Contact = require("./Contact");


/**
 *
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
    photoSrc = "";

    /**
     * Transaction type
     * @type {string}
     */
    type = "";

    /**
     * Contact information of the posting
     * @type {Contact}
     */
    contact = null;

    /**
     *
     * @param name
     * @param category
     * @param description
     * @param photo
     * @param type
     * @param contact
     */
    constructor({name="", category="", description="",
                photo="", type="", contact = {}}) {
        this.name = name;
        this.category = category;
        this.description = description;

        // TODO capire come va gestito il "data:image/<format>;base64,".
        // se fosse per me io controlleri lato client di che tipo è l'immagine (supporto solo png e jpg)
        // e quando converto l'immagine ci aggiungo all'inizio anche sta stringa con <format> = (png, jpg)
        this.photoSrc = photo;
        this.type = type;
        this.contact = new Contact(...contact);
    }
}

module.exports = PostingInfo;