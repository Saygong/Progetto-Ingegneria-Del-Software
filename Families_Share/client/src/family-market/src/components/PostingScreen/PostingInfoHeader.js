
import withLanguage from "../../../../components/LanguageContext";
import Posting from "../../api/model/Posting";
import React from "react";
import PropTypes from "prop-types";


/**
 * Class that represents a component that displays
 * name, category and transaction type of a certain posting.
 */
class PostingInfoHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const posting = this.props.posting;

        return (
            <div className="posting-info-header">
                <h5 className="infoHeaderTop">{posting.category}</h5>
                <h1 className="infoHeaderMid fitText">{posting.name}</h1>
                <h3 className="infoHeaderBot">{posting.type}</h3>
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
