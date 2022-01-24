
import withLanguage from "../../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import IconItem from "../IconItem";
import guideFile from "../../guide/FamilyMarket_Guide.pdf";

/**
 * Class that represents a button used to download a guide for Family market.
 */
class GuideButton extends React.Component {

    render() {

        return (
            <div role="button" className="navBarHeight">
                <a href={guideFile} download="Guida.pdf">
                    <IconItem iconPath="fas fa-question-circle" className="guideIcon" theme="family-icon"/>
                </a>
            </div>
        )
    }
}

GuideButton.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withRouter(withLanguage(GuideButton));
