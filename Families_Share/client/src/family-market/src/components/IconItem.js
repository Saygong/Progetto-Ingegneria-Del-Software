import withLanguage from "../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types";


/**
 * Class that represents a generic icon
 */
class IconItem extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        let iconPath = this.props.iconPath + " " + this.props.theme;

        return (
            <div className="height-100">
                <i className={iconPath} />
            </div>
        )
    }

}

IconItem.defaultProps = {
    iconPath:"",
    theme:""
}

IconItem.propTypes = {

    /**
     * Path for the icon
     */
    iconPath: PropTypes.string,

    /**
     * CSS rules for this icon
     */
    theme: PropTypes.string,

}

export default withLanguage(IconItem);

