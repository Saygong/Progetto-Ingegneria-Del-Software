const React = require("react");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";

/**
 * Class that represents a generic rectangular list item, with an image, title and description.
 */
class ListItem extends React.Component {

    /**
     * @type {{image: string | Image, title: string, description: string}}
     */
    props;

    constructor(props) {
        super(props);

    }

    render() {
        //  TODO
    }
}

module.exports = withLanguage(ListItem);