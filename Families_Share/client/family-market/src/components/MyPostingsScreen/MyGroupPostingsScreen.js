const Posting = require("../../api/model/Posting");
const GroupInfo = require("../../api/model/GroupInfo");
const PostingsWithGroupInfo = require("../../api/model/PostingsWithGroupInfo");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const PostingsList = require("../PostingsList/PostingsList");


/**
 * Class that represents the screen where all of a group's postings are displayed.
 */
class MyGroupPostingsScreen extends React.Component {

    /**
     * @type {{groupPostings: PostingsWithGroupInfo}}
     */
    props;

    /**
     *
     * @param props {{groupPostings: PostingsWithGroupInfo}}
     */
    constructor(props) {
        super(props);
    }

    render() {
        // TODO i posting si prendendono dalle props
    }
}

module.exports = MyGroupPostingsScreen;