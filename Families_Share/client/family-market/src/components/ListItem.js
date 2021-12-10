const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";

/**
 * Class that represents a generic rectangular list item, with an image, title and description.
 */
class ListItem extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        //  TODO
    }
}

ListItem.defaultProps = {
    image: "",
    title: "",
    description: ""
}

ListItem.propTypes = {
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.string,
    description: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(ListItem);