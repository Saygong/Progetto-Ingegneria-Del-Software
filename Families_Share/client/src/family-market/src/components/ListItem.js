import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../components/Log";

import texts from "../texts";

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



        let isIcon = this.props.isIcon;
        let path = this.props.image;
        if (isIcon){
            path += " family-icon";
        }

        return (

            <div className="w-100 row no-gutters height-5rem">

                <div className="col-2-10">
                    {isIcon ? (
                        <div className="center text-center">
                            <i className={path} />
                        </div>
                    ):(
                        <div className="center mx-auto">
                            <img className="img-8-10__icons" src={path} alt={txt.altImageText} />
                        </div>
                    )}
                </div>
                <div className="col-6-10 my-auto pt-3">
                    <div>
                        <h2>{this.props.title}</h2>
                    </div>
                    <div>
                        <h5>{this.props.description}</h5>
                    </div>
                </div>
                {isIcon && (
                    <div className="col-2-10">
                        <div className="center text-center">
                            <i className="fas fa-chevron-right family-icon" />
                        </div>
                    </div>
                )}

            </div>
        )
    }
}

ListItem.defaultProps = {
    isIcon: false,
    image: "",
    title: "",
    description: ""
}

ListItem.propTypes = {
    isIcon: PropTypes.bool,
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
