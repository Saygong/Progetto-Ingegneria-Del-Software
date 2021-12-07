const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const PostingNavBar = require("./PostingNavBar");
const PostingInfo = require("./PostingInfo");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the screen where a certain posting is displayed.
 */
class PostingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO PostingNavBar + PostingInfo
    }
}

PostingScreen.defaultProps = {
    isOwner: false,
    posting: Posting.EMPTY
}

PostingScreen.propTypes = {
    isOwner: PropTypes.bool,
    posting: PropTypes.instanceOf(Posting)
}

module.exports = withLanguage(PostingScreen);