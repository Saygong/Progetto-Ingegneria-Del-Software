
import withLanguage from "../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types";
import texts from "../texts";

/**
 * Class that represents a generic rectangular list item, with an image, title and description.
 * Dimension: 3-5-2
 */
class ListItem extends React.Component {


    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].listItem;
        let path = this.props.image;


        return (

            <div className="singleItem w-100 row no-gutters border-bottom">

                <div role="button" className="col-8-10 row no-gutters" onClick={this.props.onClick}>

                    <div className="col-4-10">
                        <div className="height-100">
                            <img className="listImg verticalCenter" src={path} alt={txt.altImageText} />
                        </div>
                    </div>
                    <div className="col-6-10">
                        <div className="verticalCenter">
                            <h2 className="longText">{this.props.title}</h2>
                            <h5 className="longText">{this.props.description}</h5>
                        </div>
                    </div>

                </div>

                <div className="col-2-10 text-center">
                    {this.props.sideButton}
                </div>

            </div>
        )
    }
}

ListItem.defaultProps = {
    image: "",
    title: "",
    description: "",
    sideButton: null
}

ListItem.propTypes = {
    image: PropTypes.oneOfType(
        [PropTypes.string, PropTypes.instanceOf(File), PropTypes.instanceOf(Blob)]),
    title: PropTypes.string,
    description: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string,

    /**
     * Custom button
     */
    sideButton: PropTypes.object,

    onClick: PropTypes.func
}

export default withLanguage(ListItem);
