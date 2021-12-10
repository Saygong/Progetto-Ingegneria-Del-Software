const VALID_TN_TYPES = require("../constants").TN_TYPES;

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../src/components/Log");
const ComboBox = require("ComboBox");

const texts = require("../texts");
import withLanguage from "../../../src/components/LanguageContext";


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
                <h2>{txt.description}</h2>
                <div className="row no-gutters">
                    <div className="col-2-10">
                        {/*TODO add transaction icon*/}
                        <img src={} alt={txt.altImageText} className="center"/>
                    </div>
                    <div className="col-8-10">
                        <ComboBox itemList={VALID_TN_TYPES}
                                  selectedItem={this.props.selectedItem}
                                  selectionChangeHandler={this.handleTnTypeChange}/>
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
    selectedItem: "",
    iconPath: "",
    tnTypeChangeHandler: null
}

TransactionTypeComboBox.propTypes = {
    /**
     * List of items to display
     */
    itemList: PropTypes.arrayOf(PropTypes.string),

    /**
     * Currently selected item
     */
    selectedItem: PropTypes.string,

    /**
     * Path of the image to show alongside the combobox
     */
    iconPath: PropTypes.string,

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
