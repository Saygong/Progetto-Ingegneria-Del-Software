const React = require("react");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


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

        this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    render() {
        // TODO:
    }

    async handleConfirmation() {
        this.props.confirmationHandler();
    }

}

module.exports = withLanguage(ConfirmButton);