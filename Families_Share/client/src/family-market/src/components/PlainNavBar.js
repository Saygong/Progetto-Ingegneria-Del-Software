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
            <div className="py-3 w-100 family-color navBarHeight">
                <div className="w-80 mx-auto">
                    <table className="w-100 mx-auto">
                        <tr>
                            <td>
                                <div className="w-100">
                                    <div className="w-25" role="button" onClick={this.goBack}>
                                        <i className="family-icon fas fa-arrow-left whity" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="text-center pt-3">
                                    <h1 className="whity"><strong>{this.props.title}</strong></h1>
                                </div>
                            </td>
                        </tr>
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
