
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import React from "react";
import PropTypes from "prop-types";
import SimpleTextInput from "../SimpleInput";
import IconItem from "../IconItem";


class PlaceInput extends React.Component {

    constructor(props) {
        super(props);

        this.handlePlaceChange = this.handlePlaceChange.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].editPostingScreen.placeInput;

        return (
            <div>
                <div className="row no-gutters">
                    <div className="col-2-10 text-center">
                        <IconItem iconPath="fas fa-map-marker-alt" theme="family-icon-dark" />
                    </div>
                    <div className="col-8-10">
                        <SimpleTextInput text={this.props.place}
                                         placeholder={txt.placeholder}
                                         description={txt.description}
                                         textChangeHandler={this.handlePlaceChange}
                                         type={"text"}/>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Called when a new place is picked.
     * @return {Promise<void>}
     */
    async handlePlaceChange(place) {
        this.props.placeChangeHandler(place);
    }
}

PlaceInput.defaultProps = {
    place: "",
    placeChangeHandler: null
}

PlaceInput.propTypes = {
    /**
     * Place to currently show
     */
    place: PropTypes.string,

    /**
     * Function that handles what happens when the place is changed
     */
    placeChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(PlaceInput);
