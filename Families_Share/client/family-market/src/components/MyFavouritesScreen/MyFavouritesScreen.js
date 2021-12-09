const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const {FAMILY_MARKET_BASE_PAGE_URL} = require("../../constants");

const React = require("react");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


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
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     * @type {{postings: Posting[] | []}}
     */
    state;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.matchParams = this.props.match.params;
        this.state = {
            postings: []
        };

        this.getFavouritePostings = this.getFavouritePostings.bind(this);
    }

    render() {
        // TODO postings from state
    }

    async componentDidMount() {
        // TODO fetch fav postings here and set state
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

module.exports = {
    MyFavouritesScreen: withLanguage(MyFavouritesScreen),
    MyFavouritesScreenRoute: MyFavouritesScreen.ROUTE,
    buildRedirectionHandler: MyFavouritesScreen.buildRedirectionHandler
};