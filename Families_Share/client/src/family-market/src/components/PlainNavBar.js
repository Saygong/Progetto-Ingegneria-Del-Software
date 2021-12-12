import withLanguage from "../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../components/Log");
const {withRouter} = require("react-router-dom");


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
            <div className="row no-gutters">
                <div className="col-2-10">
                    <div role="button" onClick={this.goBack}>
                        <i className="fas fa-arrow-left" />
                    </div>
                </div>
                <div className="col-8-10 center">
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
