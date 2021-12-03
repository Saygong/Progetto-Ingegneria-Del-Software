const React = require("react");
const ApiHandler = require("../api/ApiHandler");
const Log = require("../../../src/components/Log");
const Posting = require("../api/model/Posting");
const EditPostingScreen = require("../EditPostingScreen/EditPostingScreen");


/**
 * Class that represents an edit button, used to edit a posting.
 * When clicked, it redirects to an EditPostingScreen that gets loaded
 * with the posting that needs to be edited.
 */
class EditPostingButton extends React.Component {

    /**
     * @type {{posting: Posting}}
     */
    props;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     *
     * @param props {{posting: Posting}}
     */
    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        //TODO
    }

    onClick() {
        // TODO send to EditPostingScreen
    }

}

module.exports = EditPostingButton;