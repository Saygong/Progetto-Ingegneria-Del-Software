import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import PropTypes from "prop-types";

import React from "react";
import {stringify, Log} from "../../utils";
import ListItem from "../ListItem";
import {buildRedirectionHandler} from "../MyFavouritesScreen/MyFavouritesScreen";
import {withRouter} from "react-router-dom";



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
        const txt = texts[language].myFavouritesButton;
        // origin of "fas fa-heart  ->  https://fontawesome.com/v5.15/icons?d=gallery&p=2
        const myFavouritesButtonIconPath = "fas fa-heart";

        return (
            <div role="button" onClick={this.redirectToMyFavouritesScreen}>

                    <ListItem isIcon={true} image={myFavouritesButtonIconPath}
                              title={txt.title} description={txt.description}/>

                <hr />
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
