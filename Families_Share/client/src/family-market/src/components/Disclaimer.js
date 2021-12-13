import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types" ;
import Log from "../../../components/Log" ;


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
