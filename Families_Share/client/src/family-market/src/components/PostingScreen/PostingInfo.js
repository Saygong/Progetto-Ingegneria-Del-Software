import withLanguage from "../../../../components/LanguageContext";
import PostingNavBar from "./PostingNavBar";
import texts from "../../texts";

import Posting from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";


/**
 * Class that represents a component where info about a certain posting is displayed.
 */
class PostingInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const language = this.props.language;
        const instanceOfPosting = this.props.posting;
        const image = instanceOfPosting.image;
        const txt = texts[language].profileInfo;

        return (
            /* Dimension: 10vh total -> (approx: 1vh Bar) + 4vh image + 2vh Header + 3vh Tabs*/
            <div>
                <PostingNavBar postingId={instanceOfPosting.id} postingCreatorId={instanceOfPosting.user_id} />
                <div style="width:100%; height:4vh">
                    <img src={image}  alt={txt.altImageText} />
                </div>
            </div>
        );
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
