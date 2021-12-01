/**
 * Class that models contact information for a Posting
 */
class Contact {
    email = "";
    place = "";
    phoneNumber = "";

    /**
     *
     * @param email {string}
     * @param place {string} string representing a location (could also be google maps coordinates)
     * @param phoneNumber {string}
     */
    constructor(email, place, phoneNumber) {
        this.email = email;
        this.place = place;
        this.phoneNumber = phoneNumber;
    }
}

module.exports = Contact;