import withLanguage from "../../../../components/LanguageContext";

const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");


/**
 * Class that represents a component that displays
 * name, category and transaction type of a certain posting.
 */
class PostingInfoHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const language = this.props.language;
        const posting = this.props.posting;
        return (
            <div style="text-align:center">
                <h1>{posting.category}</h1>
                <h2>{posting.name}</h2>
                <h1>{posting.type}</h1>
            </div>
        );
    }
}

PostingInfoHeader.defaultProps = {
    posting: Posting.EMPTY
}

PostingInfoHeader.propTypes = {
    /**
     * Posting to display the info of
     */
    posting: PropTypes.instanceOf(Posting),

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(PostingInfoHeader);
