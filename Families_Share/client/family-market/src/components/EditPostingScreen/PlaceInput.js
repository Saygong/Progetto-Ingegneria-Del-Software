const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


class PlaceInput extends React.Component {

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
     * Called when a new place is picked.
     * @param newPlace {string}
     * @return {Promise<void>}
     */
    async handlePlaceSelection(newPlace) {
        this.props.placeChangeHandler(newPlace);
    }
}

PlaceInput.defaultProps = {
    place: "",
    placeChangeHandler: null
}

PlaceInput.propTypes = {
    place: PropTypes.string,
    placeChangeHandler: PropTypes.func.isRequired
}

module.exports = withLanguage(PlaceInput);