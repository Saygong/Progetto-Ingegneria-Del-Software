
import withLanguage from "../../../../components/LanguageContext";
import {NO_CATEGORY, NO_TN_TYPE, DEBUG} from "../../constants";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";
import ApiHandler from "../../api/ApiHandler";
import React from "react";
import PropTypes from "prop-types";
import PostingsList from "../PostingsList/PostingsList";
import {FAVOURITES_MODE} from "../PostingsList/PostingsListItem";
import CreatePostingButton from "./CreatePostingButton";
import SearchBar from "../SearchBar";
import MarketplaceNavBar from "./MarketplaceNavBar";
import {withRouter} from "react-router-dom";
import CategorySelector from "../CategorySelector";
import Disclaimer from "../Disclaimer/Disclaimer";
import TransactionTypeButtons from "../TransactionTypeButtons";
import LoadingSpinner from "../../../../components/LoadingSpinner";


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

    defaultTnType;

    defaultCat;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler("", "", DEBUG);
        this.defaultTnType = NO_TN_TYPE[this.props.language];
        this.defaultCat = NO_CATEGORY[this.props.language];

        this.state = {
            groupPostings: [],
            filterText: "",
            filterTnType: this.defaultTnType,
            filterCategory: this.defaultCat,
            fetchedData: false,
        };

        this.getGroupPostings = this.getGroupPostings.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDisclaimer = this.handleDisclaimer.bind(this);
    }


    render() {
        // It is fine if, after the user creates a posting, he gets redirected to this page,
        // because it will be reloaded and the new posting will be shown.
        const onCreateRedirection = {
            pathname: this.props.location.pathname,
            state: this.props.location.state
        };
        const {fetchedData} = this.state;

        return fetchedData ? (

            <div>

                { localStorage.getItem("disclaimer") === "null" ? (
                    <Disclaimer handle={this.handleDisclaimer} />) : null
                }

                <MarketplaceNavBar/>

                <div className="margin-top-2rem w-80 mx-auto">
                    <div className="mb-3">
                        <SearchBar text={this.state.filterText}
                                   textChangeHandler={this.handleSearchBarChange}/>
                    </div>
                    <div  className="mb-3">

                        <CategorySelector value={this.state.filterCategory ? this.state.filterCategory : this.defaultCat }
                                          categoryChangeHandler={this.handleCategoryChange}/>

                    </div>
                    <div  className="mb-4">
                        <TransactionTypeButtons defaultValue={this.defaultTnType}
                                                 tnTypeChangeHandler={this.handleTransactionTypeChange}/>
                    </div>
                    <CreatePostingButton onCreateRedirection={onCreateRedirection}/>

                    <hr className="mt-3" />
                </div>

                <PostingsList postings={this.state.groupPostings}
                      itemMode={FAVOURITES_MODE}
                      filterText={this.state.filterText}
                      filterTnType={this.state.filterTnType}
                      filterCategory={this.state.filterCategory}/>

            </div>
        ) : (
            <LoadingSpinner />
        );
    }

    async componentDidMount() {
        const currentGroupPostings = await this.getGroupPostings();

        this.setState({
            groupPostings: currentGroupPostings,
            fetchedData: true,
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
     * Called when the disclaimer has been accepted
     * Updates the prop accordingly.
     */
    handleDisclaimer() {
        localStorage.setItem("disclaimer", "accepted");
        window.location.reload(false);
    }


    /**
     * Returns an url used to redirect to this page.
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
    language: PropTypes.string,
}


export const MarketplaceScreenRoute = MarketplaceScreen.ROUTE;
export const buildRedirectionHandler = MarketplaceScreen.buildRedirectionHandler;
export default withRouter(withLanguage(MarketplaceScreen));
