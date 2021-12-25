import withLanguage from "../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types";


/**
 * Class that represents a generic icon
 */
class IconButton extends React.Component {

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

IconButton.defaultProps = {
    iconPath:"",
    theme:""
}

IconButton.propTypes = {

    /**
     * Path for the icon
     */
    iconPath: PropTypes.string,

    /**
     * CSS rules for this icon
     */
    theme: PropTypes.string,

}

export default withLanguage(IconButton);
