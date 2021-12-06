const React = require("react");
const Log = require("../../../src/components/Log");


/**
 * Class that represents a button used to delete something.
 */
class DeleteButton extends React.Component {

    /**
     * @type {{deletionHandler: function}}
     */
    props;

    /**
     *
     * @param props {{deletionHandler: function}}
     */
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

        /* TODO magari passare un prop che propone modalità large oppure small
         * perché nella schermata di editing/creazione (vedi documento di progettazione)
         * c'è un bottone delete più grande di una semplice icona del cestino
         */

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

module.exports = DeleteButton;