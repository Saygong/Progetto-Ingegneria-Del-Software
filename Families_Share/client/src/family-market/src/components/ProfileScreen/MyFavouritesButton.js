import withLanguage from "../../../../components/LanguageContext";

const PropTypes = require("prop-types");

const React = require("react");
const Log = require("../../../../components/Log");
const ListItem = require("../ListItem");
const {buildRedirectionHandler} = require("../MyFavouritesScreen/MyFavouritesScreen");
const {withRouter} = require("react-router-dom");


/**
 * Class that represents the button to access the "my favourites" screen.
 *
 * TODO This button must be added to the ProfileScreen component
 */
class MyFavouritesButton extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToMyFavouritesScreen = this.redirectToMyFavouritesScreen.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].myPostingsButton;
        // origin of "fas fa-heart  ->  https://fontawesome.com/v5.15/icons?d=gallery&p=2
        const myFavouritesButtonIconPath = "fas fa-heart";

        return (
            <div className="row no-gutters" role="button" onClick={this.redirectToMyFavouritesScreen}>
                <div className="col-8-10">
                    <ListItem isIcon={true} image={myFavouritesButtonIconPath} title={txt.title} description={txt.description}/>
                </div>
                <div className="col-2-10">
                    <i className="fas fa-chevron-right" />
                </div>
            </div>
        );
    }

    /**
     * Called when this button is clicked.
     */
    redirectToMyFavouritesScreen() {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const redirectionHandler = buildRedirectionHandler(this.props.history, userId);

        Log.info("Redirecting to MyFavouritesScreen ", this);

        redirectionHandler();
    }
}

MyFavouritesButton.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withRouter(withLanguage(MyFavouritesButton));
