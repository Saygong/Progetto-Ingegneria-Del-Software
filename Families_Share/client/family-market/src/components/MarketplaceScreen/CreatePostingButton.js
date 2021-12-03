const React = require("react");
const ApiHandler = require("../../api/ApiHandler");
const Log = require("../../../../src/components/Log");
const EditPostingScreen = require("../EditPostingScreen/EditPostingScreen");


/**
 * Class that represents a button used to create a posting.
 * When clicked, it redirects to an empty EditPostingScreen that is used
 * to create a new posting.
 */
class CreatePostingButton extends React.Component {

    /**
     * @type {{userId: string, groupId: string}}
     */
    props;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     *
     * @param props {{userId: string, groupId: string}}
     */
    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        // TODO
    }

    onClick() {
        // TODO send to EditPostingScreen
    }

}

module.exports = CreatePostingButton;