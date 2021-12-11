import withLanguage from "../../../components/LanguageContext";

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../components/Log");

const texts = require("../texts");


/**
 * Class that represents a generic rectangular list item, with an image, title and description.
 */
class ListItem extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].listItem;

        return (
            <div role="button" className="row no-gutters">
                <div className="col-2-10">
                    <img className="center"
                         src={this.props.image} alt={txt.altImageText}/>
                </div>
                <div className="col-8-10">
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.description}</h2>
                </div>
            </div>
        )
    }
}

ListItem.defaultProps = {
    image: "",
    title: "",
    description: ""
}

ListItem.propTypes = {
    image: PropTypes.oneOfType(
        [PropTypes.string, PropTypes.instanceOf(File), PropTypes.instanceOf(Blob)]),
    title: PropTypes.string,
    description: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(ListItem);