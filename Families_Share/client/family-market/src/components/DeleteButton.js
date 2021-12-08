const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
import withLanguage from "../../../src/components/LanguageContext";


/**
 * Class that represents a button used to delete something.
 */
class DeleteButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        // TODO
    }

    /**
     * Called when the button is pressed.
     * @return {Promise<void>}
     */
    async handleDelete() {
        this.props.deletionHandler();
    }
}

DeleteButton.defaultProps = {
    deletionHandler: null
}

DeleteButton.propTypes = {
    deletionHandler: PropTypes.func.isRequired
}

module.exports = withLanguage(DeleteButton);