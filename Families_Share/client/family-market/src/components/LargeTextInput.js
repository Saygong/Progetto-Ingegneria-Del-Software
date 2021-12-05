const React = require("react");
const Log = require("../../../../src/components/Log");


class LargeTextInput extends React.Component {

    /**
     * @type {{description: string, text: string, textChangeHandler: function}}
     */
    props;

    /**
     *
     * @param props {{description: string, text: string, textChangeHandler: function}}
     */
    constructor(props) {
        super(props);
    }

    render() {
        // TODO description è il titoletto che va sopra la textbox
    }

    async onTextChange() {
        // TODO richiamare props.textChangeHandler()
    }
}

module.exports = LargeTextInput;