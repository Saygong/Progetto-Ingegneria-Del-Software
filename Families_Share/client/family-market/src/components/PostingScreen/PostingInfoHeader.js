const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents a component that displays
 * name, category and transaction type of a certain posting.
 */
class PostingInfoHeader extends React.Component {

    /**
     * @type {{posting: Posting}}
     */
    props;

    /**
     *
     * @param props {{posting: Posting}}
     */
    constructor(props) {
        super(props);
    }

    render() {
        // TODO
    }
}

module.exports = withLanguage(PostingInfoHeader);