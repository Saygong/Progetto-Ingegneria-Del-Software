import withLanguage from "../../../../components/LanguageContext";

import Posting from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import texts from "../../texts";


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
        const txt = texts[language].postingInfoHeader;

        return (
            <div>
                <h4 className="infoHeaderTop">{posting.category}</h4>
                <h1 className="infoHeaderMid">{posting.name}</h1>
                <h4 className="infoHeaderBot">{posting.type}</h4>
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
