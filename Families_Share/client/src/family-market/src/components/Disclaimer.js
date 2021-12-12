import withLanguage from "../../../components/LanguageContext";

// TODO -> ricordare che testo va messo dentro texts.js
import React from "react";
import PropTypes from "prop-types" ;
import Log from "../../../components/Log" ;


//TODO abbiamo deciso che non serve e aggiungiamo direttamente una frase nel
// disclaimer generale che esiste già


class Disclaimer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

            </div>
        );
    }

}

Disclaimer.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(Disclaimer);
