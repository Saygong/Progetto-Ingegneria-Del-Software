const React = require("react");
const ApiHandler = require("../../api/ApiHandler");
const Log = require("../../../../src/components/Log");
const Posting = require("../../api/model/Posting");
const CreatePostingButton = require("CreatePostingButton");
const SearchBar = require("../SearchBar");
const CategoryComboBox = require("../CategoryComboBox");
const TransactionTypeComboBox = require("../TransactionTypeComboBox");
const MarketplaceNavBar = require("MarketplaceNavBar");
const VALID_CATEGORIES = require("../../constants").CATEGORIES;


class MarketplaceScreen extends React.Component {

    /**
     * Changed by the search bar and the two combo boxes
     * @type {{filterText: string, filterTnType: string, filterCategory: string}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.groupPostings = [];
        this.apiHandler = new ApiHandler();

        this.state = {
            filterText: "",
            filterTnType: "",
            filterCategory: ""
        };

        this.getGroupPostings = this.getGroupPostings.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    render() {
        // TODO
    }

    async getGroupPostings() {
        // TODO get postings from api -> component didmount o component update?
    }

    handleSearchBarChange() {
        // TODO change state
    }

    handleTransactionTypeChange() {
        // TODO change state
    }

    handleCategoryChange() {
        // TODO change state
    }
}

module.exports = MarketplaceScreen;