import withLanguage from "../../../components/LanguageContext";

import React from "react";
import PropTypes from "prop-types";
import IconButton from "./IconButton";

/**
 * Class that represents a generic rectangular menu item, with an icon, title and description and a right arrow.
 * Dimension: 2-6-2
 */
class MenuItem extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let path = this.props.path + " " + "family-icon-dark";

        return (

            <div className="w-100 row no-gutters height-8rem border-bottom">

                <div className="col-2-10">

                    <div className="height-100 text-center">
                        <IconButton iconPath={path} theme="family-icon-dark" />
                    </div>

                </div>
                <div className="col-6-10">
                    <div className="verticalCenter">
                        <h2>{this.props.title}</h2>
                        <h5>{this.props.description}</h5>
                    </div>
                </div>

                <div className="col-2-10 text-center">
                    <IconButton iconPath="fas fa-chevron-right" theme="family-icon-dark" />
                </div>

            </div>
        )
    }
}

MenuItem.defaultProps = {
    path: "",
    title: "",
    description: ""
}

MenuItem.propTypes = {
    path: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,

}

export default withLanguage(MenuItem);
