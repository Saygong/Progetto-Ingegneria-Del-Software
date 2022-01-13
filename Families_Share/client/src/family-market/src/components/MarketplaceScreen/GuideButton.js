import texts from "../../texts";
import withLanguage from "../../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types";
import {Log} from "../../utils";
import {withRouter} from "react-router-dom";
import IconItem from "../IconItem";
import guideFile from "./dummy_guide.pdf";

/**
 * Class that represents a button used to download a guide for Family market.
 */
class GuideButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const language = this.props.language;

        return (
            <div role="button" className="navBarHeight">
                <a href={guideFile} download="Guida.pdf">
                    <IconItem iconPath="fas fa-fa-question-circle" theme="family-icon"/>
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
