const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PostingNavBar = require("./PostingNavBar");
const PostingInfo = require("./PostingInfo");


/**
 * Class that represents the screen where a certain posting is displayed.
 */
class PostingScreen extends React.Component {

    /**
     * @type {{isOwner: boolean, posting: Posting}}
     */
    props;

    /**
     *
     * @param props {{isOwner: boolean, posting: Posting}}
     */
    constructor(props) {
        super(props);
    }

    render() {
        // TODO PostingNavBar + PostingInfo
    }
}

module.exports = PostingScreen;