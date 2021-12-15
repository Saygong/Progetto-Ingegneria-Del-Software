import withLanguage from "../../../components/LanguageContext";
import texts from "../texts";

import {TN_TYPES} from "../constants";

import React from "react";
import PropTypes from "prop-types";
import ComboBox from "react-responsive-combo-box";

class TransactionTypeComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].transactionTypeComboBox;

        return (
            <div>
                <h4>{txt.description}</h4>
                <table className="w-100 mx-auto">
                    <tbody>
                        <tr>
                            <td className="w-10icon">
                                <i className="family-icon fas fa-filter"/>
                            </td>
                            <td className="w-80Market">
                                <ComboBox options={TN_TYPES[language]}
                                          defaultValue={this.props.defaultValue}
                                          onSelect={this.handleTnTypeChange}
                                          editable={false}
                                          className="cbox"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }


    /**
     * Called when the selected transaction type in the combobox changes.
     * @param newTnType {string}
     */
    async handleTnTypeChange(newTnType) {
        this.props.tnTypeChangeHandler(newTnType);
    }
}

TransactionTypeComboBox.propTypes = {
    defaultValue: PropTypes.string.isRequired,

    /**
     * Function that handles what happens when the selected item changes
     */
    tnTypeChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(TransactionTypeComboBox);
