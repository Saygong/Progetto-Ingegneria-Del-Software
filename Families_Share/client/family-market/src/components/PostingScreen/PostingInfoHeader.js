const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents a component that displays
 * name, category and transaction type of a certain posting.
 */
class PostingInfoHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO
    }
}

PostingInfoHeader.defaultProps = {
    posting: Posting.EMPTY
}

PostingInfoHeader.propTypes = {
    posting: PropTypes.instanceOf(Posting)
}

module.exports = withLanguage(PostingInfoHeader);