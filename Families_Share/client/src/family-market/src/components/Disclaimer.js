import withLanguage from "../../../components/LanguageContext";

// TODO -> ricordare che testo va messo dentro texts.js
const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../components/Log");




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

module.exports = withLanguage(Disclaimer);