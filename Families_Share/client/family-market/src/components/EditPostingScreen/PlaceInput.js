const React = require("react");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


class PlaceInput extends React.Component {
    /**
     *
     * @type {{place: string, selectionChangeHandler: function(string)}}
     */
    props;

    /**
     *
     * @param props {{place: string, selectionChangeHandler: function(string)}}
     */
    constructor(props) {
        super(props);

        this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
    }

    render() {
        // TODO react-location-picker? in base a cosa viene scelto vanno anche
        //      cambiati i parametri che onPlaceSelection accetta
        // https://www.npmjs.com/package/react-location-picker
        // https://www.npmjs.com/package/react-google-map-picker
        // Non ho capito concretamente cosa cambia tra i due.
        // Importante è scegliere uno che ti permetta di ottenere anche l'indirizzo
        // come stringa e non solo le coordinate.
    }

    /**
     * Called when a new place is selected.
     * @param newPlace {string}
     * @return {Promise<void>}
     */
    async handlePlaceSelection(newPlace) {
        this.props.selectionChangeHandler(newPlace);
    }
}

module.exports = withLanguage(PlaceInput);