const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the navigation bar of the editing screen.
 */
class EditNavBar extends React.Component {

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
        // TODO PlainNavBar con MyProfileButton
        // TODO capire se ha senso farla perché il pulsante conferma è stato spostato come
        //      pulsante "normale" dentro la pagina e non è più sulla barra (vedi docs)
        //      in caso non avesse senso si mette una PlainNavBar e via e togliere confirmationHandler da props
    }

    /**
     * Called when the confirmation button is pressed.
     *
     * TODO: Might need to remove if the button is not placed on the navigation bar
     * @return {Promise<void>}
     */
    async handleConfirmation() {
        this.props.confirmationHandler();
    }
}

module.exports = withLanguage(EditNavBar);