import withLanguage from "../../../../components/LanguageContext";

import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";
import {TESTING} from "../../constants";

import ApiHandler from "../../api/ApiHandler";
import Posting  from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import PostingNavBar from "./PostingNavBar";
import PostingInfo from "./PostingInfo";
import Log from "../../../../components/Log";
import {stringify} from "../../utils";


/**
 * Class that represents the screen where a certain posting is displayed.
 */
class PostingScreen extends React.Component {

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{postingId: string}}
     */
    matchParams;

    /**
     * @type {{posting: Posting}}
     */
    state;

    /**
     * Retrieved from location.state as additional information that is passed when
     * the app redirects to this screen (see buildRedirectionHandler).
     *
     * Location to redirect to after the posting displayed by this instance is deleted,
     * which is possible if the user is the owner and clicks to the edit button,
     * which in turn loads the edit screen where the posting can be deleted.
     * Passed to lower components.
     * @type {{pathname: string, state: Object}}
     */
    onPostingDeleteRedirection;

    /**
     * Used to communicate with the server api.
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.matchParams = this.props.match.params;
        this.onPostingDeleteRedirection = this.props.location.state.onDeleteRedirection;
        this.apiHandler = new ApiHandler("", "", TESTING)("", TESTING);
        this.state = {
            posting: Posting.EMPTY
        }
    }

    render() {
        const currentPosting = this.state.posting;

        /**
         * TODO this is not used as of now because there is a race condition
         *      that happens when you confirm the edit, which causes the posting not
         *      to display the edited information.
         *      Instead, atm, this.onPostingDeleteRedirection is passed to PostingNavBar
         */
        const onEditRedirection = {
            pathname: this.props.location.pathname,
            state: this.props.location.state
        };

        return (
            <div>
                <PostingNavBar postingId={currentPosting.id}
                               postingName={currentPosting.name}
                               postingCreatorId={currentPosting.user_id}
                               onEditRedirection={this.onPostingDeleteRedirection}
                               onDeleteRedirection={this.onPostingDeleteRedirection}/>
                <hr/>
                <PostingInfo posting={this.state.posting}/>
            </div>
        );
    }

    async componentDidMount() {
        const currentPosting = await this.fetchPosting();
        console.log("Fetched posting: " + stringify(currentPosting));
        this.setState({
            posting: currentPosting
        });
    }

    /**
     * Fetch the posting to display in this page.
     * @return {Promise<Posting|Posting.EMPTY>}
     */
    async fetchPosting() {
        const postingId = this.matchParams.postingId;

        return this.apiHandler.getPosting(postingId);
    }

    /**
     * Returns an url used to redirect to this page.
     * @param postingId {string} posting to load
     * @return {string}
     */
    static buildUrl(postingId) {
        const route = PostingScreen.ROUTE;

        return route.replace(":postingId", postingId);
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/posting/:postingId";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param postingId {string} posting to load
     * @param onDeleteRedirection {{pathname: string, state: Object}} url and state that determine which
     *      page the user will be redirected to after a posting is deleted.
     * @return {function}
     */
    static buildRedirectionHandler(history, postingId,
                                   onDeleteRedirection) {
        return () => {
            history.push({
                pathname: PostingScreen.buildUrl(postingId),
                state: {
                    onDeleteRedirection: onDeleteRedirection
                }
            });
        }
    }
}

PostingScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export const buildPostingScreenRedirectionHandler = PostingScreen.buildRedirectionHandler;
export const PostingScreenRoute = PostingScreen.ROUTE;
export default withLanguage(PostingScreen);
