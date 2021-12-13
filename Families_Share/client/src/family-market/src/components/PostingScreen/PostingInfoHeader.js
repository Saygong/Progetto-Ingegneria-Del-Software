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
                <h6>{txt.category}</h6>
                <h2>{posting.category}</h2>
                <hr/>
                <h6>{txt.title}</h6>
                <h2>{posting.name}</h2>
                <hr/>
                <h6>{txt.type}</h6>
                <h2>{posting.type}</h2>
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
