const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PostingInfoHeader = require("PostingInfoHeader");
const PostingInfoTabs = require("PostingInfoTabs");


/**
 * Class that represents a component where info about a certain posting is displayed.
 */
class PostingInfo extends React.Component {

    /**
     * @type {{posting: Posting}}
     */
    props;

    /**
     *
     * @param props {{posting: Posting}}
     */
    constructor(props) {
        super(props);
    }

    render() {
        // TODO usare Image + PostingInfoHeader + PostingInfoTabs
    }
}

module.exports = PostingInfo;