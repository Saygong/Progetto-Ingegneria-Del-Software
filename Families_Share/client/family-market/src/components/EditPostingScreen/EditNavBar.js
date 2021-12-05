const React = require("react");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");


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

    }

    render() {
        // TODO PlainNavBar con MyProfileButton
        // TODO capire se ha senso farla perché il pulsante conferma è stato spostato come
        //      pulsante "normale" dentro la pagina e non è più sulla barra (vedi docs)
        //      in caso non avesse senso si mette una PlainNavBar e via e togliere confirmationHandler da props
    }
}

module.exports = EditNavBar;