import withLanguage from "../../../components/LanguageContext";
import texts from "../texts";

import {TESTING} from "../constants";

import ApiHandler from "../api/ApiHandler";

import React from "react" ;
import PropTypes from "prop-types";
import Log from "../../../components/Log";



/**
 * Class that represents a toggleable button that changes the "favourite" state of something.
 */
class ToggleFavouriteButton extends React.Component {

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.isFavouriteImage = "";
        this.notFavouriteImage = "";

        this.apiHandler = new ApiHandler("", TESTING);
        this.state = {
            isFavourite: false
        };

        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {

        // Determine which image to display
        const isFavPath = "fas fa-bookmark";
        const isNotFavPath = "far fa-bookmark";
        const imgPath = this.state.isFavourite ? isFavPath : isNotFavPath;

        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].toggleFavButton;

        return (
            <div className="">
                <button onClick={this.handleFavouriteChange}>
                    <i className={imgPath} />
                </button>
            </div>
        )
    }

    async componentDidMount() {
        // Fetch the favourite state of the posting and set it to update the button
        const currentPostingId = this.props.postingId;
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const isFav = await this.apiHandler.isUserFavourite(userId, currentPostingId);

        // Update only if necessary
        if (this.state.isFavourite !== isFav) {
            this.setState({
                isFavourite: isFav
            });
        }
    }

    /**
     * Called when the button is clicked.
     * Changes the button state and adds/removes the current posting to/from the user's favourites.
     * @return {Promise<void>}
     */
    async handleFavouriteChange() {
        // since the button has been clicked, the state needs to be toggled
        const newIsFav = !this.state.isFavourite;
        const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const postingId = this.props.postingId;
        if (newIsFav) {
            await this.apiHandler.addUserFavourite(currentUserId, postingId);
        }
        else {
            await this.apiHandler.removeUserFavourite(currentUserId, postingId);
        }

        this.setState({
            isFavourite: newIsFav
        });
    }
}

ToggleFavouriteButton.propTypes = {
    /**
     * Id of the posting to change the favourite state of
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
};

export default withLanguage(ToggleFavouriteButton);
