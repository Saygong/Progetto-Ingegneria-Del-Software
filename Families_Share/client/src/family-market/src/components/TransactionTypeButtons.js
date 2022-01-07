
import withLanguage from "../../../components/LanguageContext";
import texts from "../texts";
import {TN_TYPES} from "../constants";
import React from "react";
import PropTypes from "prop-types";

class TransactionTypeButtons extends React.Component {

    constructor(props) {
        super(props);
        this.handleTnTypeChange = this.handleTnTypeChange.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].transactionTypeComboBox;
        const options = TN_TYPES[language];

        const option1 = (this.props.value === options[1]);
        const option2 = (this.props.value === options[2]);
        return (
            <div>

                <div  className="mb-2">
                    <span>{txt.description}</span>
                </div>

                <div className="transactionsContainer">

                    {(!this.props.createMode) &&
                        <div className="transactionContainers">
                            <input type="radio" className="btn-check no-decorations" name="options" id={options[0]}/>
                            <label className="btn mybtn-primary" htmlFor={options[0]} onClick={() => this.handleTnTypeChange(options[0]) }> {options[0]} </label>
                        </div>
                    }

                    <div className="transactionContainers">
                        <input type="radio" className="btn-check no-decorations" name="options" id={options[1]} checked={option1}/>
                        <label className="btn mybtn-primary" htmlFor={options[1]} onClick={() => this.handleTnTypeChange(options[1]) }> {options[1]} </label>
                    </div>

                    <div className="transactionContainers">
                        <input type="radio" className="btn-check no-decorations" name="options" id={options[2]} checked={option2}/>
                        <label className="btn mybtn-primary" htmlFor={options[2]} onClick={() => this.handleTnTypeChange(options[2]) }> {options[2]} </label>
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

TransactionTypeButtons.propTypes = {
    value: PropTypes.string,

    /**
     * Function that handles what happens when the selected item changes
     */
    tnTypeChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string,

    /**
     *  It
     */
    createMode: PropTypes.bool,

}

TransactionTypeButtons.defaultProps = {
    createMode : false

}


export default withLanguage(TransactionTypeButtons);
