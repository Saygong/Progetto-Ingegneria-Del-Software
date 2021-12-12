import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import PropTypes from "prop-types";

import React from "react";
import Log from "../../../../components/Log";
import ListItem from "../ListItem";
import {buildRedirectionHandler} from "../MyPostingsScreens/MyGroupsWithPostingsScreen";
import {withRouter} from "react-router-dom";


/**
 * Class that represents the button to access the "my postings" section.
 *
 * TODO This button must be added to the ProfileScreen component
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
            <div className="row no-gutters" role="button" onClick={this.redirectToMyPostingsScreens}>
                <div className="col-8-10">
                    <ListItem isIcon={true} image={myPostingsButtonIconPath} title={txt.title} description={txt.description}/>
                </div>
                <div className="col-2-10">
                    <i className="fas fa-chevron-right" />
                </div>
            </div>

        );
    }

    redirectToMyPostingsScreens() {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const redirectionHandler = buildRedirectionHandler(this.props.history, userId);

        Log.info("Redirecting to MyGroupsWithPostingsScreen ", this);

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
