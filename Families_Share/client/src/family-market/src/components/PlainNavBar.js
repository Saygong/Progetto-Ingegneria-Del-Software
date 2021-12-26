import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import {stringify, Log} from "../utils";
import {withRouter} from "react-router-dom";
import MyProfileButton from "./MarketplaceScreen/MyProfileButton";


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
        let otherComp = this.props.otherComponent;

        return (

            <div className="row no-gutters family-color navBarHeight ">
                <div role="button" onClick={this.goBack} className="col-2-10 text-center ">
                    <i className="fas fa-arrow-left family-icon" />
                </div>

                <div className="col-6-10">
                    <h2 className="navBarTitle"><strong>{this.props.title}</strong></h2>
                </div>

                <div className="col-2-10 text-center">
                    {otherComp}
                </div>
            </div>


        );
    }

    /**
     * Called when the go-back button is clicked.
     */
    goBack() {
        // If goBackUrl has not been set, simply go back one page
        const {goBackLocation} = this.props;
        if (goBackLocation.pathname === "") {
            Log.info("Redirecting to the previous page...", this);

            this.props.history.goBack();
        }
        else
        {
            const redirection = this.props.goBackLocation;
            Log.info(`Redirecting to ${stringify(redirection.pathname)}`, this);

            // Replace and not push, else the history stack gets polluted
            this.props.history.replace(redirection);
        }
    }
}

PlainNavBar.defaultProps = {
    title: "",
    goBackLocation: {
        pathname: "",
        state: {}
    },
    otherComponent: null
}

PlainNavBar.propTypes = {
    /**
     * Text displayed in the navigation bar.
     */
    title: PropTypes.string,

    /**
     * Location to redirect to when the button to go back is pressed.
     */
    goBackLocation: PropTypes.object,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    otherComponent: PropTypes.object
}


export default withRouter(withLanguage(PlainNavBar));
