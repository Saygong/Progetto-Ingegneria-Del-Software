import withLanguage from "../../../../components/LanguageContext";

const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");



/**
 * Class that represents a component that displays
 * description, place and contact of a certain posting as tabs of a tab menu.
 */
class PostingInfoTabs extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return;
        // TODO
    }
}

PostingInfoTabs.defaultProps = {
    posting: Posting.EMPTY
}

PostingInfoTabs.propTypes = {
    /**
     * Posting to display the info of
     */
    posting: PropTypes.instanceOf(Posting),

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(PostingInfoTabs);