const ApiHandler = require("../../api/ApiHandler");

const React = require("react");
const Log = require("../../../../src/components/Log");


/**
 * Class that represents a button used to create a posting.
 * When clicked, it redirects to an empty EditPostingScreen that is used
 * to create a new posting.
 */
class MyProfileButton extends React.Component {

    /**
     * @type {{profileId: string}}
     */
    props;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     *
     * @param props {{profileId: string}}
     */
    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        // TODO
    }

    async onClick() {
        // TODO send to EditPostingScreen
    }
}

module.exports = MyProfileButton;