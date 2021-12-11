import withLanguage from "../../../../components/LanguageContext";

const PropTypes = require("prop-types");

const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const {FAMILY_MARKET_BASE_PAGE_URL} = require("../../constants");

const React = require("react");
const Log = require("../../../../components/Log");
const CreatePostingButton = require("./CreatePostingButton");
const SearchBar = require("../SearchBar");
const CategoryComboBox = require("../CategoryComboBox");
const TransactionTypeComboBox = require("../TransactionTypeComboBox");
const MarketplaceNavBar = require("./MarketplaceNavBar");



/**
 * Screen that represents the main page of Family Market.
 */
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
        return;
        // TODO
    }

    async componentDidMount() {
        // TODO load postings



    }

    /**
     * Returns all the postings of the current group.
     * @return {Promise<Posting[]|[]>}
     */
    async getGroupPostings() {
        const groupId = JSON.parse(localStorage.getItem("group")).id;
        return this.apiHandler.getGroupPostings(groupId);
    }

    /**
     * Called when the text in the search bar is changed.
     * Updates the state accordingly.
     * @param newText {string}
     */
    handleSearchBarChange(newText) {
        this.setState({
            filterText: newText
        });
    }

    /**
     * Called when the text in the search bar is changed.
     * Updates the state accordingly.
     * @param newTnType {string}
     */
    handleTransactionTypeChange(newTnType) {
        this.setState({
            filterTnType: newTnType
        });
    }

    /**
     * Called when the text in the search bar is changed.
     * Updates the state accordingly.
     * @param newCategory {string}
     */
    handleCategoryChange(newCategory) {
        this.setState({
            filterCategory: newCategory
        });
    }

    /**
     * Returns a url used to redirect to this page.
     * @return {string}
     */
    static buildUrl() {
        return MarketplaceScreen.ROUTE;
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/marketplace";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by encapsulating navigation behaviour for this class.
     * @param history {History}
     * @return {function}
     */
    static buildRedirectionHandler(history) {
        return () => {
            history.push(MarketplaceScreen.buildUrl());
        }
    }
}

MarketplaceScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default {
    MarketplaceScreen: withLanguage(MarketplaceScreen),
    MarketplaceScreenRoute: MarketplaceScreen.ROUTE,
    buildRedirectionHandler: MarketplaceScreen.buildRedirectionHandler
};