import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../components/Log";
import {withRouter} from "react-router-dom";


/**
 * Class that represents a basic navigation bar, with a title and
 * a back button that takes you to the previous page.
 */
class PlainNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
    }

    render() {
        return (
            <div className="w-75 navbar text-center navBarColor mx-auto">


                <div className="nav-item" role="button" onClick={this.goBack}>
                    <i className="ourIcon fas fa-arrow-left " />
                </div>
                <div className="nav-item">
                    <h1>{this.props.title}</h1>
                </div>

            </div>
        );
    }

    /**
     * Called when the go-back button is clicked.
     */
    goBack() {
        // If goBackUrl has not been set, simply go back one page
        if (this.props.goBackUrl === "") {
            Log.info("Redirecting to the previous page...", this);

            this.props.history.goBack();
        }
        else
        {
            const redirectionUrl = this.props.goBackUrl;
            Log.info(`Redirecting to ${redirectionUrl}the previous page...`, this);

            this.props.history.replace(redirectionUrl)
        }
    }
}

PlainNavBar.defaultProps = {
    title: "",
    goBackUrl: "",
}

PlainNavBar.propTypes = {
    /**
     * Text displayed in the navigation bar.
     */
    title: PropTypes.string,

    /**
     * Url to redirect to when the button to go back is pressed.
     */
    goBackUrl: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}


export default withRouter(withLanguage(PlainNavBar));
