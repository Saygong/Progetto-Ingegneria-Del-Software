
import withLanguage from "../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types";
import IconItem from "./IconItem";


/**
 * Class that represents a generic rectangular menu item, with an icon, title and description and a right arrow.
 * Dimension: 2-6-2
 */
class MenuItem extends React.Component {

    render() {
        let path = this.props.path;


        return (

            <div className="w-100 row no-gutters height-8rem border-bottom">

                <div className="col-2-10">

                    <div className="height-100 text-center">
                        <IconItem iconPath={path} theme="family-icon-dark" />
                    </div>

                </div>
                <div className="col-6-10">
                    <div className="verticalCenter">
                        <h3>{this.props.title}</h3>
                        <p>{this.props.description}</p>
                    </div>
                </div>

                <div className="col-2-10 text-center">
                    <IconItem iconPath="fas fa-chevron-right" theme="family-icon-dark" />
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
