<<<<<<< HEAD:Families_Share/client/family-market/src/components/MyFavouritesScreen/MyFavouritesScreen.js
import withLanguage from "../../../../src/components/LanguageContext";
=======
import withLanguage from "../../../../components/LanguageContext";

const PropTypes = require("prop-types");
>>>>>>> testing:Families_Share/client/src/family-market/src/components/MyFavouritesScreen/MyFavouritesScreen.js

const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const {FAMILY_MARKET_BASE_PAGE_URL} = require("../../constants");

const React = require("react");
<<<<<<< HEAD:Families_Share/client/family-market/src/components/MyFavouritesScreen/MyFavouritesScreen.js
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const PlainNavBar = require("../PlainNavBar");
const texts = require("../../texts");
=======
const Log = require("../../../../components/Log");
>>>>>>> testing:Families_Share/client/src/family-market/src/components/MyFavouritesScreen/MyFavouritesScreen.js


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
<<<<<<< HEAD:Families_Share/client/family-market/src/components/MyFavouritesScreen/MyFavouritesScreen.js
        const language = this.props.language;
        const txt = texts[language].favouritesScreen;

        return (
            <div>
                <PlainNavBar title={txt.navBar.title} goBackUrl={} />
                // TODO
            </div>
        )
=======
        return;
        // TODO postings from state
>>>>>>> testing:Families_Share/client/src/family-market/src/components/MyFavouritesScreen/MyFavouritesScreen.js
    }

    async componentDidMount() {
        const favPostings = this.getFavouritePostings(this.matchParams.userId);
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

export default {
    MyFavouritesScreen: withLanguage(MyFavouritesScreen),
    MyFavouritesScreenRoute: MyFavouritesScreen.ROUTE,
    buildRedirectionHandler: MyFavouritesScreen.buildRedirectionHandler
};