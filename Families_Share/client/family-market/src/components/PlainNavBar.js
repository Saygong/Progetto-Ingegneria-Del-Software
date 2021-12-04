const React = require("react");
const Log = require("../../../src/components/Log");

class PlainNavBar extends React.Component {

    /**
     * @type {{title: string}}
     */
    props;

    /**
     *
     * @param props {{title: string}}
     */
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
    }

    render() {
        // TODO
    }

    goBack() {
        // TODO fa history.goBack()
    }

}

module.exports = PlainNavBar;