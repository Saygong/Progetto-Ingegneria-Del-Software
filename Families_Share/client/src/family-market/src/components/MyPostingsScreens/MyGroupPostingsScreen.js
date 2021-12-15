import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import {FAMILY_MARKET_BASE_PAGE_URL} from  "../../constants";
import {TESTING} from "../../constants";

import ApiHandler from "../../api/ApiHandler";

import React from "react";
import PropTypes from "prop-types";
import PlainNavBar from "../PlainNavBar";
import PostingsList from "../PostingsList/PostingsList";
import {EDIT_MODE} from "../PostingsList/PostingsListItem";
import {stringify, Log} from "../../utils";


/**
 * Class that represents the screen where all of a group's postings are displayed.
 */
class MyGroupPostingsScreen extends React.Component {

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{userId: string, groupId: string}}
     */
    matchParams;

    /**
     * @type {{group_name: string, postings: Posting[]}}
     */
    state;

    /**
     * Used to communicate with the server api.
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);
        this.apiHandler = new ApiHandler("", "", TESTING)("", TESTING);
        this.matchParams = this.props.match.params;
        this.state = {
            group_name: "",
            postings: []
        };
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].myGroupsPostingsScreen;
        const noPostings = (this.state.postings.length === 0);

        return (
            <div>
                <div className="w-100">
                    <PlainNavBar title={txt.prefix + this.state.group_name}/>
                </div>
                <div className="w-90 mx-auto">
                    { noPostings ? (
                        <h1>{txt.noPostingsText}</h1>
                    ) : (
                        <PostingsList postings={this.state.postings}/>)
                    }
                </div>
            </div>
        );

    }

    async componentDidMount() {
        const currentGroupPostings = await this.fetchPostings();

        Log.info("Group postings fetched: " + stringify(currentGroupPostings));

        const group_info = await this.apiHandler.getGroupInfo(this.matchParams.groupId);

        this.setState({
            group_name: group_info.name,
            postings: currentGroupPostings
        });
    }

    /**
     * Returns the postings of the current user in this group.
     * @return {Promise<Posting[] | []>}
     */
    async fetchPostings() {
        const userId = this.matchParams.userId;
        const groupId = this.matchParams.groupId;
        return this.apiHandler.getUserPostings(userId, groupId);
    }

    /**
     * Returns a url used to redirect to this page.
     * @param userId {string} id of the user to get the postings of
     * @param groupId {string} id of the group that the user postings belong to
     * @return {string}
     */
    static buildUrl(userId, groupId) {
        const route = MyGroupPostingsScreen.ROUTE;
        const withUserId = route.replace(":userId", userId);

        return withUserId.replace(":groupId", groupId);
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/users/:userId/groups/:groupId/postings";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param userId {string} id of the user to get the postings of
     * @param groupId {string} id of the group that the user postings belong to
     * @return {function}
     */
    static buildRedirectionHandler(history, userId, groupId) {
        return () => {
            history.push(MyGroupPostingsScreen.buildUrl(userId, groupId))
        }
    }
}

MyGroupPostingsScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export const MyGroupPostingsScreenRoute = MyGroupPostingsScreen.ROUTE;
export const buildRedirectionHandler = MyGroupPostingsScreen.buildRedirectionHandler;

export default withLanguage(MyGroupPostingsScreen);
