const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const PostingInfoHeader = require("PostingInfoHeader");
const PostingInfoTabs = require("PostingInfoTabs");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents a component where info about a certain posting is displayed.
 */
class PostingInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO usare Image + PostingInfoHeader + PostingInfoTabs
    }
}

PostingInfo.defaultProps = {
    posting: Posting.EMPTY
}

PostingInfo.propTypes = {
    posting: PropTypes.instanceOf(Posting)
}

module.exports = withLanguage(PostingInfo);