const React = require("react");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";


/**
 * Class that represents a basic navigation bar, with a title and
 * a back button that takes you to the previous page.
 */
class PlainNavBar extends React.Component {

    /**
     * @type {{title: string}}
     */
    props;

    /**
     *
     * @param props {{title: string}}
     */
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
    }

    render() {
        // TODO
    }

    goBack() {
        // TODO fa history.goBack()
    }
}

module.exports = withLanguage(PlainNavBar);