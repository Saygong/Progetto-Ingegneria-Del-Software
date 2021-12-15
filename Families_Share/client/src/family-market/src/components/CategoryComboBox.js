import withLanguage from "../../../components/LanguageContext";

import {CATEGORIES, NO_CATEGORY} from "../constants";
import React from "react";
import PropTypes from "prop-types";
import ComboBox from "react-responsive-combo-box";
import texts from "../texts";


class CategoryComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].categoryComboBox;

        return (
            <div>
                <h4>{txt.description}</h4>
                <table className="w-100 mx-auto">
                    <tr>
                        <td className="w-10icon">
                            <i className="family-icon fas fa-th-large"/>
                        </td>
                        <td className="w-80Market">
                            <ComboBox options={CATEGORIES[language]}
                                      defaultValue={NO_CATEGORY[language]}
                                      onSelect={this.handleCategoryChange}
                                      editable={false}
                                      className="cbox"
                            />
                        </td>
                    </tr>
                </table>
            </div>
        )
    }

    /**
     * Called when the selected category in the combobox changes.
     * @param newCategory {string}
     */
    async handleCategoryChange(newCategory) {
        this.props.categoryChangeHandler(newCategory);
    }
}

CategoryComboBox.defaultProps = {
    itemList: [],
    categoryChangeHandler: null
}

CategoryComboBox.propTypes = {
    /**
     * Function that handles what happen when the selected category is changed
     */
    categoryChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(CategoryComboBox);
