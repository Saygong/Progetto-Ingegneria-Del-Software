const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../src/components/LanguageContext";


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
        // TODO
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
    goBackUrl: ""
}

PlainNavBar.propTypes = {
    /**
     * Text displayed in the navigation bar.
     */
    title: PropTypes.string,

    /**
     * Url to redirect to when the button to go back is pressed.
     */
    goBackUrl: PropTypes.string
}

PlainNavBar.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withRouter(withLanguage(PlainNavBar));