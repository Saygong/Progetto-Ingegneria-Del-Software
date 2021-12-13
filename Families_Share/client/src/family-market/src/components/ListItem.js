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
        let isUser = false;
        if(this.props.isIcon === "fas fa-users"){
            isUser = true;
        }
        let isFav = false;
        if(this.props.isIcon === "fas fa-heart"){
            isFav = true;
        }
        let isImage = ((!isUser) && (!isFav))

        return (

            <div className="w-100 h-80px p-5">
                <table className="w-100">
                    <tr className="">
                        <td className="w-20 ">
                            <div className="w-100 ">
                                {isUser && (
                                    <div className="center ">
                                        <i className="fas fa-users family-icon" />
                                    </div>
                                )}
                                {isFav &&(
                                    <div className="center ">
                                        <i className="fas fa-heart family-icon" />
                                    </div>
                                )}
                            </div>
                        </td>
                        <td className="w-70">

                        </td>
                    </tr>
                </table>

            </div>
        )
    }
}

ListItem.defaultProps = {
    isIcon: "",
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
