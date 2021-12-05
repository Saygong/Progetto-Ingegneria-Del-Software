const Posting = require("../api/model/Posting");

const React = require("react");
const Log = require("../../../src/components/Log");
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
     *
     * @param props {{posting: Posting}}
     */
    constructor(props) {
        super(props);

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