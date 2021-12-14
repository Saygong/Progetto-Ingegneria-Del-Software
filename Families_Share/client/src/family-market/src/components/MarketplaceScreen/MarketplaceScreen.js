import withLanguage from "../../../../components/LanguageContext";

import {NO_CATEGORY, NO_TN_TYPE, TESTING} from "../../constants";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";

import ApiHandler from "../../api/ApiHandler";

import React from"react";
import PropTypes from "prop-types";
import PostingsList from "../PostingsList/PostingsList";
import {FAVOURITES_MODE} from "../PostingsList/PostingsListItem";
import CreatePostingButton from "./CreatePostingButton";
import SearchBar from "../SearchBar";
import CategoryComboBox from "../CategoryComboBox";
import TransactionTypeComboBox from "../TransactionTypeComboBox";
import MarketplaceNavBar from "./MarketplaceNavBar";
import {withRouter} from "react-router-dom";


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
     * Used to communicate with the server api.
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler("", TESTING);

        this.state = {
            groupPostings: [],
            filterText: "",
            filterTnType: NO_TN_TYPE[this.props.language],
            filterCategory: NO_CATEGORY[this.props.language],
        };

        this.getGroupPostings = this.getGroupPostings.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    render() {
        // It is fine if, after the user creates a posting, he gets redirected to this page,
        // because it will be reloaded and the new posting will be shown.
        const onCreateRedirection = {
            pathname: this.props.location.pathname,
            state: this.props.location.state
        };

        return (
            <div className="mx-auto w-8 mt-2">
                <MarketplaceNavBar/>

                <div className="w-75 mx-auto">
                    <SearchBar text={this.state.filterText} textChangeHandler={this.handleSearchBarChange}/>
                    <CategoryComboBox categoryChangeHandler={this.handleCategoryChange}/>
                    <TransactionTypeComboBox tnTypeChangeHandler={this.handleTransactionTypeChange}/>

                    <CreatePostingButton onCreateRedirection={onCreateRedirection}/> <hr/>
                </div>

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

        // TODO debug
        //console.log(JSON.stringify(currentGroupPostings))

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

export default withRouter(withLanguage(MarketplaceScreen));
