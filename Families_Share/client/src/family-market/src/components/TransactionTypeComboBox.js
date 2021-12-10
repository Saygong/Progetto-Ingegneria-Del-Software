import withLanguage from "../../../components/LanguageContext";

const VALID_TN_TYPES = require("../constants").TN_TYPES;

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../components/Log");
const ComboBox = require("react-responsive-combo-box");

const texts = require("../texts");



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
                        <ComboBox options={VALID_TN_TYPES}
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
     * List of items to display
     */
    itemList: PropTypes.arrayOf(PropTypes.string),

    /**
     * Function that handles what happens when the selected item changes
     */
    tnTypeChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

module.exports = withLanguage(TransactionTypeComboBox);
