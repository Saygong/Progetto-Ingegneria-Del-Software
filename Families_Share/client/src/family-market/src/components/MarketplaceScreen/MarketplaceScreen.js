import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import PostingsList from "../PostingsList/PostingsList";
import {FAVOURITES_MODE} from "../PostingsList/PostingsListItem";

import PropTypes from "prop-types";
import ApiHandler from "../../api/ApiHandler";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";
import React from"react";
import CreatePostingButton from "./CreatePostingButton";
import SearchBar from "../SearchBar";
import CategoryComboBox from "../CategoryComboBox";
import TransactionTypeComboBox from "../TransactionTypeComboBox";
import MarketplaceNavBar from "./MarketplaceNavBar";


/**
 * Screen that represents the main page of Family Market.
 */
class MarketplaceScreen extends React.Component {

    /**
     * Changed by the search bar and the two combo boxes
     * @type {{filterText: string, filterTnType: string, filterCategory: string,
     *          groupPostings: Posting[]}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();

        this.state = {
            groupPostings: [],
            filterText: "",
            filterTnType: "",
            filterCategory: "",
        };

        this.getGroupPostings = this.getGroupPostings.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].marketplaceScreen;
        //TODO va messo qualche url particolare?
        const goBackRedirectionUrl = "";

        return (
            <div>
                <MarketplaceNavBar title={txt.navBar.title} goBackUrl={goBackRedirectionUrl}/>
                <SearchBar text={this.state.filterText} textChangeHandler={this.handleSearchBarChange}/>
                <CategoryComboBox categoryChangeHandler={this.handleCategoryChange}/>
                <TransactionTypeComboBox tnTypeChangeHandler={this.handleTransactionTypeChange}/>

                {/*TODO bottone CreatePostButton che url mettere?*/}
                <CreatePostingButton onCreateUrl={""}/> <hr/>

                {/*TODO PostingList da controllare e finire*/}
                <PostingsList postings={this.state.groupPostings}
                      itemMode={FAVOURITES_MODE}
                      filterText={this.state.filterText}
                      filterTnType={this.state.filterTnType}
                      filterCategory={this.state.filterCategory}/>
            </div>
        );
    }

    async componentDidMount() {//TODO da controllare (this loads postings)
        const currentGroupPostings = await this.getGroupPostings();
        this.setState({
            groupPostings: currentGroupPostings
        });
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
     * @param newCategory {string}
     */
    handleCategoryChange(newCategory) {
        this.setState({
            filterCategory: newCategory
        });
    }

    /**
     * Called when the text in the TransactionTypeComboBox. is changed.
     * Updates the state accordingly.
     * @param newTnType {string}
     */
    handleTransactionTypeChange(newTnType) {
        this.setState({
            filterTnType: newTnType
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

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/marketplace";
    }
}

MarketplaceScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export const MarketplaceScreenRoute = MarketplaceScreen.ROUTE;
export const buildRedirectionHandler = MarketplaceScreen.buildRedirectionHandler;

export default withLanguage(MarketplaceScreen);
