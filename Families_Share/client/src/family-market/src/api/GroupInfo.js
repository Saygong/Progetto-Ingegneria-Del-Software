/**
 * Class that represents identifying information about a group.
 * It is used to map certain json request/response data to/from the api.
 */
class GroupInfo {
    /**
     * Id of the group
     * @type {string}
     */
    id = ""

    /**
     * Name of the group
     * @type {string}
     */
    name = ""

    /**
     *
     * @param id
     * @param name
     */
    constructor({id="", name=""}) {
        this.id = id
        this.name = name
    }
}

export default GroupInfo