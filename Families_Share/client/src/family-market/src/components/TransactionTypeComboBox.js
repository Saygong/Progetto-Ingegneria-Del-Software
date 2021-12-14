import withLanguage from "../../../components/LanguageContext";
import texts from "../texts";

import {TN_TYPES, NO_TN_TYPE} from "../constants";

import React from "react";
import PropTypes from "prop-types";
import ComboBox from "react-responsive-combo-box";
import Log from "../../../components/Log";


class TransactionTypeComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].transactionTypeComboBox;
        /*TODO add transaction icon and change img to icon*/
        const tnIconPath = "";

        return (
            <div>
                <h4>{txt.description}</h4>
                <table className="w-100 mx-auto">
                    <tr>
                        <td className="w-10icon">
                            <img src={tnIconPath} alt={txt.altImageText} className="center"/>
                        </td>
                        <td className="w-80Market">
                            <ComboBox options={TN_TYPES[language]}
                                      defaultValue={NO_TN_TYPE[language]}
                                      onSelect={this.handleTnTypeChange}
                                      editable={false}/>
                        </td>
                    </tr>
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

TransactionTypeComboBox.defaultProps = {
    itemList: [],
    tnTypeChangeHandler: null
}

TransactionTypeComboBox.propTypes = {
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
