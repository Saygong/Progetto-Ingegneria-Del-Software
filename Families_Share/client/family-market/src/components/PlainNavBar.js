const React = require("react");
const Log = require("../../../src/components/Log");
const {withRouter} = require("react-router-dom");
import withLanguage from "../../../src/components/LanguageContext";
import PropTypes from "prop-types";


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
        Log.info("Redirecting to the previous page...", this);

        this.props.history.goBack();
    }
}

PlainNavBar.defaultProps = {
    title: ""
}

PlainNavBar.propTypes = {
    title: PropTypes.string,
}

module.exports = withRouter(withLanguage(PlainNavBar));