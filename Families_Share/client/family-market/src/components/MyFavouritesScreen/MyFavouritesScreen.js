import {FAMILY_MARKET_BASE_URL} from "../../constants";

const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
import withLanguage from "../../../../src/components/LanguageContext";


/**
 * Class that represents the screen where a user's favourite postings are displayed.
 */
class MyFavouritesScreen extends React.Component {

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
        this.state = {
            postings: []
        };

        this.getFavouritePostings = this.getFavouritePostings.bind(this);
    }

    render() {
        // TODO postings from state
    }

    componentDidMount() {
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
     * Returns the url of this page.
     * @return {string}
     */
    static get pageUrl() {
        return FAMILY_MARKET_BASE_URL + "/favourites";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by encapsulating navigation behaviour for this class.
     * @param history {History}
     * @param state {Object}
     * @param goBackUrl {string} url to go back to, from this page.
     *      If not specified, a simple history.goBack() is performed.
     * @param goBackState {Object} state (if any) to pass when going back to the specified page.
     */
    static getRedirectionHandler(history, state, goBackUrl="", goBackState={}) {

    }

}

module.exports = withLanguage(MyFavouritesScreen);