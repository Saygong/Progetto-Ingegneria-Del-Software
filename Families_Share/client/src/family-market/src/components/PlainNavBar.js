import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import {stringify, Log} from "../utils";
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
            <div className="py-3 w-100 family-color navBarHeight">
                <div className="w-80 mx-auto">
                    <table className="w-100 mx-auto">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="w-100">
                                        <div className="w-25 " role="button" onClick={this.goBack}>
                                            <i className="family-icon fas fa-arrow-left whity" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="pt-3 margin-left-30">
                                        <h1 className="whity"><strong>{this.props.title}</strong></h1>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            Log.info(`Redirecting to ${stringify(redirection)} the previous page...`, this);

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
    language: PropTypes.string
}


export default withRouter(withLanguage(PlainNavBar));
