
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import PropTypes from "prop-types";
import React from "react";
import {Log} from "../../utils";
import {buildRedirectionHandler} from "../MyFavouritesScreen/MyFavouritesScreen";
import {withRouter} from "react-router-dom";
import MenuItem from "../MenuItem";



/**
 * Class that represents the button to access the "my favourites" screen.
 *
 */
class MyFavouritesButton extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToMyFavouritesScreen = this.redirectToMyFavouritesScreen.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].myFavouritesButton;
        const myFavouritesButtonIconPath = "fas fa-heart";

        return (

            <div role="button" onClick={this.redirectToMyFavouritesScreen}>

                    <MenuItem path={myFavouritesButtonIconPath}
                              title={txt.title} description={txt.description}/>

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
