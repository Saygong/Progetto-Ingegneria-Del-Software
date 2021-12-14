import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import {TESTING} from "../../constants";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";

import ApiHandler from "../../api/ApiHandler";

import React from "react";
import PropTypes from "prop-types";
import PlainNavBar from "../PlainNavBar";
import PostingsList from "../PostingsList/PostingsList";



/**
 * Class that represents the screen where a user's favourite postings are displayed.
 */
class MyFavouritesScreen extends React.Component {

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{userId: string}}
     */
    matchParams;

    /**
     * Used to communicate with the server api.
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     * @type {{postings: Posting[] | []}}
     */
    state;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler("", TESTING);
        this.matchParams = this.props.match.params;
        this.state = {
            postings: []
        };

        this.getFavouritePostings = this.getFavouritePostings.bind(this);
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].favouritesScreen;
        const noPostings = (this.state.postings.length === 0);

        return (
            <div>
                <div>
                    <PlainNavBar title={txt.navBar.title} />
                </div>
                <div className="w-95">
                    { noPostings ? (
                        <h1>{txt.noPostingsText}</h1>
                    ) : (
                        <PostingsList postings={this.state.postings}/>
                    )}
                </div>
            </div>
        );
    }

    async componentDidMount() {
        const favPostings = await this.getFavouritePostings(this.matchParams.userId);
        this.setState({
            postings: favPostings
        });
    }

    /**
     * Retrieves the user's favourite postings
     * @param userId {string}
     * @return {Promise<Posting[] | []>}
     */
    async getFavouritePostings(userId) {
        return this.apiHandler.getUserFavouritePostings(userId);
    }

    /**
     * Returns a url used to redirect to this page.
     * @param userId {string} user whose favourites should be displayed
     * @return {string}
     */
    static buildUrl(userId) {
        const route = MyFavouritesScreen.ROUTE;
        return route.replace(":userId", userId);
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/users/:userId/favourites";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by encapsulating navigation behaviour for this class.
     * @param history {History}
     * @param userId {string} user whose favourites should be displayed
     * @return {function}
     */
    static buildRedirectionHandler(history, userId) {
        return () => {
            history.push(MyFavouritesScreen.buildUrl(userId))
        }
    }
}

MyFavouritesScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export const MyFavouritesScreenRoute = MyFavouritesScreen.ROUTE;
export const buildRedirectionHandler = MyFavouritesScreen.buildRedirectionHandler;

export default withLanguage(MyFavouritesScreen);
