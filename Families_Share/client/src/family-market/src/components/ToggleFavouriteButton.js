import withLanguage from "../../../components/LanguageContext";

const ApiHandler = require("../api/ApiHandler");
const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../components/Log");

const texts = require("../texts");


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

        this.apiHandler = new ApiHandler();
        this.state = {
            isFavourite: false
        };

        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {
        // TODO: change the displayed image based on the isFavourite prop
        // Determine which image to display
        const isFavPath = "../../assets/fav-icon-yes.png";
        const isNotFavPath = "../../assets/fav-icon-no.png";
        const imgPath = this.state.isFavourite ? isFavPath : isNotFavPath;

        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].toggleFavButton;

        return (
            <button>
                <img src={imgPath} alt={txt.altImageText}
                     width={200} height={200}
                     onClick={this.handleFavouriteChange}/>
            </button>
        )
    }

    async componentDidMount() {
        // Fetch the favourite state of the posting and set it to update the button
        const currentPosting = this.props.posting;
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const isFav = await this.apiHandler.isUserFavourite(userId, currentPosting.id);

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

module.exports = withLanguage(ToggleFavouriteButton);