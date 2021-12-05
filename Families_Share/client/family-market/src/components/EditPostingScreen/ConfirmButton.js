const React = require("react");
const Log = require("../../../src/components/Log");


/**
 * Class that represents a button that is pressed to confirm a certain action.
 */
class ConfirmButton extends React.Component {

    /**
     * @type {{confirmationHandler: function}}
     */
    props;

    /**
     *
     * @param props {{confirmationHandler: function}}
     */
    constructor(props) {
        super(props);

    }

    render() {
        // TODO:
    }

    async OnClick() {
        // TODO chiama confirmationHandler
    }

}

module.exports = ConfirmButton;