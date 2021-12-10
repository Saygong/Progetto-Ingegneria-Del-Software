/**
 * Class that models contact information for a Posting.
 * It is used to map certain json request/response data to/from the api.
 */
class Contact {
    /*
    * Note: nomenclature has to be the same as that defined in the Api docs,
    * which means that snake_case is used instead of lowerCamelCase.
    * This is so the api can accept this object when it is automatically converted
    * to json by axios, and no remapping is needed.
    */

    /**
     *
     * @type {string}
     */
    email = "";

    /**
     *
     * @type {string}
     */
    place = "";

    /**
     *
     * @type {string}
     */
    phone_number = "";

    /**
     *
     * @param email {string}
     * @param place {string} string representing a location (could also be google maps coordinates)
     * @param phoneNumber {string}
     */
    constructor({email="", place="", phoneNumber=""} = {}) {
        this.email = email;
        this.place = place;
        this.phone_number = phoneNumber;
    }

    /**
     *
     * @return {Contact}
     */
    static get EMPTY() {
        return new Contact();
    }
}

module.exports = Contact;