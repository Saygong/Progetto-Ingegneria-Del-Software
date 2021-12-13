import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import Posting from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import PostingInfoHeader from "./PostingInfoHeader";
import PostingInfoTabs from "./PostingInfoTabs";
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
        const txt = texts[language].postingInfo;

        const instanceOfPosting = this.props.posting;
        const image = instanceOfPosting.image;

        return (
            /* Dimension: 10vh total -> (approx: 1vh Bar) + 4vh image + 2vh Header + 3vh Tabs*/
            <div>
                <img src={image}  alt={txt.altImageText}/>
                <hr/>
                <PostingInfoHeader posting={this.props.posting}/>
                <hr/>
                <PostingInfoTabs  posting={this.props.posting}/>
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
