/**
 * Class that represents identifying information about a group.
 * It is used to map certain json request/response data to/from the api.
 */
class GroupInfo {
    /**
     * Id of the group
     * @type {string}
     */
    id = "";

    /**
     * Name of the group
     * @type {string}
     */
    name = "";

    /**
     *
     * @param id {string}
     * @param name {string}
     */
    constructor({id, name}) {
        this.id = id;
        this.name = name;
    }

    /**
     *
     * @return {GroupInfo}
     */
    static get EMPTY() {
        const empty = {
            id:"",
            name:""
        }

        return new GroupInfo(empty);
    }
}
export default GroupInfo;
