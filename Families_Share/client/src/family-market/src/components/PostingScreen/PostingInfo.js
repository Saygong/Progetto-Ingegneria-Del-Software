import withLanguage from "../../../../components/LanguageContext";

const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");
const PostingInfoHeader = require("./PostingInfoHeader");
const PostingInfoTabs = require("./PostingInfoTabs");


/**
 * Class that represents a component where info about a certain posting is displayed.
 */
class PostingInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
        );
        // TODO usare Image + PostingInfoHeader + PostingInfoTabs
    }
}

PostingInfo.defaultProps = {
    posting: Posting.EMPTY
}

PostingInfo.propTypes = {
    /**
     * Posting to display the info of
     */
    posting: PropTypes.instanceOf(Posting),

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(PostingInfo);
