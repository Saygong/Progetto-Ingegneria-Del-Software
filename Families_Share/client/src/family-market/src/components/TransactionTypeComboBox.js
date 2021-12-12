import withLanguage from "../../../components/LanguageContext";

import types from "../constants";
import React from "react";
import PropTypes from "prop-types";
import Log from "../../../components/Log";
import ComboBox from "react-responsive-combo-box";
import texts from "../texts";

class TransactionTypeComboBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
    }

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].transactionTypeComboBox;
        /*TODO add transaction icon*/
        const tnIconPath = "";

        return (
            <div>
                <h2>{txt.description}</h2>
                <div className="row no-gutters">
                    <div className="col-2-10">
                        <img src={tnIconPath} alt={txt.altImageText} className="center"/>
                    </div>
                    <div className="col-8-10">
                        <ComboBox options={types.TN_TYPES}
                                  onSelect={this.handleTnTypeChange}
                                  editable={false}/>
                    </div>
                </div>
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
