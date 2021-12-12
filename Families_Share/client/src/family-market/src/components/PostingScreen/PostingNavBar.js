
import withLanguage from "../../../../components/LanguageContext";
import {buildUrl} from "./PostingScreen";


const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");
const PlainNavBar = require("../PlainNavBar");
const EditPostingButton = require("../EditPostingButton");
const ToggleFavouriteButton = require("../ToggleFavouriteButton");


/**
 * Class that represents the navigation bar of the posting screen.
 * It has the default go back button, a toggle favourite button and
 * a button to go to the editing/creation screen.
 */
class PostingNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const postingTitle = this.props.name;

        return (
            <div className="col no-gutters">
                <div className="col-8-10">
                    <PlainNavBar title={postingTitle} goBackUrl={""} />
                </div>
                {this.isCurrentUserOwner() ?(
                    <div className="col-2-10">
                        { /* TODO aggiungere editUrl e DeleteUrl in maniera intelligente */}
                        <EditPostingButton postingId={this.props.postingId} onEditUrl={window.location.href} onDeleteUrl={""} />
                    </div>
                ):(
                    <div className="col-2-10">
                        <ToggleFavouriteButton postingId={this.props.postingId} />
                    </div>
                )}
            </div>
        );
    }

    /**
     * Returns true if the current user is the owner of the posting that is being displayed,
     * false otherwise.
     * @return {boolean}
     */
    isCurrentUserOwner() {
        const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const postingCreatorId = this.props.postingCreatorId;

        return currentUserId === postingCreatorId;
    }
}

PostingNavBar.propTypes = {
    /**
     * Passed as prop to the favourite and edit button.
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Id of the user that created the posting.
     * Used to determine if the current user is the owner of the posting and
     * consequently which buttons to show .
     */
    postingCreatorId: PropTypes.string.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
};

export default withLanguage(PostingNavBar);
