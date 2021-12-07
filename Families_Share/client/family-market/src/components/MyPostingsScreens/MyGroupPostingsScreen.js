const Posting = require("../../api/model/Posting");
const GroupInfo = require("../../api/model/GroupInfo");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const PostingsList = require("../PostingsList/PostingsList");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the screen where all of a group's postings are displayed.
 */
class MyGroupPostingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO i posting si prendendono dalle props
    }

    componentDidMount() {
        // get postings
    }

    async getPostings() {

    }
}

MyGroupPostingsScreen.defaultProps = {
    groupInfo: GroupInfo.EMPTY
}

MyGroupPostingsScreen.propTypes = {
    groupInfo: PropTypes.instanceOf(GroupInfo)
}

module.exports = withLanguage(MyGroupPostingsScreen);