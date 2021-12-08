// TODO -> ricordare che testo va messo dentro texts.js
const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");

import withLanguage from "../../../src/components/LanguageContext";


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

module.exports = withLanguage(Disclaimer);