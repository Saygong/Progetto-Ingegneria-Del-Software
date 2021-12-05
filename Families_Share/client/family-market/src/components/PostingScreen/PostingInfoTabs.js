const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");


/**
 * Class that represents a component that displays
 * description, place and contact of a certain posting as tabs of a tab menu.
 */
class PostingInfoTabs extends React.Component {

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
        // TODO
    }
}

module.exports = PostingInfoTabs;