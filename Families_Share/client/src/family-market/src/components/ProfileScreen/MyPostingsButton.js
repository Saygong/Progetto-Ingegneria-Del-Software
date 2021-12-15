import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import PropTypes from "prop-types";

import React from "react";
import {stringify, Log} from "../../utils";
import ListItem from "../ListItem";
import {buildRedirectionHandler} from "../MyPostingsScreens/MyGroupsScreen";
import {withRouter} from "react-router-dom";


/**
 * Class that represents the button to access the "my postings" section.
 *
 */
class MyPostingsButton extends React.Component {

    constructor(props) {
        super(props);

        this.redirectToMyPostingsScreens = this.redirectToMyPostingsScreens.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].myPostingsButton;
        // origin of "fas fa-users  ->  https://fontawesome.com/v5.15/icons?d=gallery&p=2
        const myPostingsButtonIconPath = "fas fa-users"

        return (

            <div className="pt-3" role="button" onClick={this.redirectToMyPostingsScreens}>
                <ListItem isIcon={true} image={myPostingsButtonIconPath}
                          title={txt.title} description={txt.description}/>
                <hr />
            </div>

        );
    }

    redirectToMyPostingsScreens() {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const redirectionHandler = buildRedirectionHandler(this.props.history, userId);

        Log.info("Redirecting to MyGroupsScreen ", this);
        redirectionHandler();
    }
}

MyPostingsButton.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withRouter(withLanguage(MyPostingsButton));
