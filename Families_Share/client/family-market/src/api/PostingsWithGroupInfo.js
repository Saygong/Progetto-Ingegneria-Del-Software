const Posting = require("./Posting");
const GroupInfo = require("./GroupInfo");

/**
 * Class that represents a list of postings paired with
 * the info of the group they belong to.
 * It is used to map certain json request/response data to/from the api.
 */
class PostingsWithGroupInfo {
    /**
     *
     * @type {GroupInfo}
     */
    groupInfo = GroupInfo.EMPTY;

    /**
     *
     * @type {Array<Posting>}
     */
    postings = [];

    /**
     *
     * @param groupInfo {GroupInfo}
     * @param postings {Array<Posting>}
     */
    constructor({groupInfo=GroupInfo.EMPTY, postings=[]} = {}) {
        this.groupInfo = groupInfo;
        this.postings = postings;
    }

    /**
     *
     * @return {PostingsWithGroupInfo}
     */
    static get EMPTY() {
        return new PostingsWithGroupInfo();
    }
}

module.exports = PostingsWithGroupInfo;