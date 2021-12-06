const React = require("react");
const Log = require("../../../../src/components/Log");
const EditPostingScreen = require("../EditPostingScreen/EditPostingScreen");


/**
 * Class that represents a button used to create a posting.
 * When clicked, it redirects to an empty EditPostingScreen that is used
 * to create a new posting.
 */
class CreatePostingButton extends React.Component {

    constructor(props) {
        super(props);

        this.redirectToPostingScreen = this.redirectToPostingScreen.bind(this);
    }

    render() {
        // TODO
    }

    /**
     * Called when the button is clicked.
     */
    redirectToPostingScreen() {
        // TODO send to EditPostingScreen -> need to pass userId and groupId as props
    }
}

module.exports = CreatePostingButton;