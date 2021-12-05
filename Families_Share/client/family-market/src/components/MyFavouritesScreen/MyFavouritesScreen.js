const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");


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

}

module.exports = MyFavouritesScreen;