<<<<<<< HEAD:Families_Share/client/family-market/src/components/EditPostingScreen/PlaceInput.js
import withLanguage from "../../../../src/components/LanguageContext";
import LocationPicker from "react-location-picker";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
=======
import withLanguage from "../../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../components/Log");

>>>>>>> testing:Families_Share/client/src/family-market/src/components/EditPostingScreen/PlaceInput.js


class PlaceInput extends React.Component {

    constructor(props) {
        super(props);

        this.handlePlaceChange = this.handlePlaceChange.bind(this);
    }

    render() {
        return;
        // TODO react-location-picker? in base a cosa viene scelto vanno anche
        //      cambiati i parametri che onPlaceSelection accetta
        // https://www.npmjs.com/package/react-location-picker
        // https://www.npmjs.com/package/react-google-map-picker
        // Non ho capito concretamente cosa cambia tra i due.
        // Importante è scegliere uno che ti permetta di ottenere anche l'indirizzo
        // come stringa e non solo le coordinate.

        // Reference tutorial:
        // https://codesandbox.io/s/qljl8y8nwq?file=/src/LPicker.js:144-202
        const defaultPos = {
            lat: 27.9878,
            lng: 86.925
        };

        return (
            <LocationPicker containerElement={<div style={{ height: "100%" }} />}
                            mapElement={<div style={{ height: "400px" }} />}
                            zoom={17}
                            radius={-1}
                            defaultPosition={defaultPos}
                            onChange={this.handlePlaceChange}
            />
        );

    }

    /**
     * Called when a new place is picked.
     * @param position {string}
     * @param address {string}
     * @param places
     * @return {Promise<void>}
     */
    async handlePlaceChange(position, address, places) {
        // TODO a questo punto potrebbe essere da cambiare il modo in cui vengono salvati i posti
        // perché servono anche le coordinate -> dunque c'è da cambiare anche il meccanismo dei props,
        // perché andrebbero passati sia coordinate che address
        this.props.placeChangeHandler(address);
    }
}

PlaceInput.defaultProps = {
    place: "",
    placeChangeHandler: null
}

PlaceInput.propTypes = {
    /**
     * Place to currently show
     */
    place: PropTypes.string,

    /**
     * Function that handles what happens when the place is changed
     */
    placeChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(PlaceInput);