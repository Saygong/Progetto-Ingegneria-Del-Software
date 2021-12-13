import withLanguage from "../../../../components/LanguageContext";

import Posting from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";


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
            <div>
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
