
import withLanguage from "../../../../components/LanguageContext";
import {buildUrl} from "./PostingScreen";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import PlainNavBar from "../PlainNavBar";
import EditPostingButton from "../EditPostingButton";
import ToggleFavouriteButton from "../ToggleFavouriteButton";
import withRouter from "react-router-dom/es/withRouter";


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
                {this.isCurrentUserOwner() ? (
                    <div className="col-2-10">

                        {/* TODO onDeleteUrl dovrebbe essere quello di due pagine prima.
                                Per prenderlo bisogna probabilmente passarlo come prop,
                                ed eventualmente passarlo al buildRedirectionHandler di
                                Posting screen in modo che lui poi lo passi come info aggiuntiva
                                una volta che si viene redirezionati a PostingScreen */}

                        <EditPostingButton postingId={this.props.postingId}
                                           onEditUrl={this.props.location.pathname}
                                           onDeleteUrl={""} />
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

export default withRouter(withLanguage(PostingNavBar));
