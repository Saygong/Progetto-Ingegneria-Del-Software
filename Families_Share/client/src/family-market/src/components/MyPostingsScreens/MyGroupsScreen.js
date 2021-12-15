import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import {TESTING} from "../../constants";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../../constants";

import ApiHandler from "../../api/ApiHandler";

import React from "react";
import PropTypes from "prop-types";
import PlainNavBar from "../PlainNavBar";
import GroupList from "../../../../components/GroupList";
import {stringify, Log} from "../../utils";


/**
 * Class that represents the screen where all current user's group are displayed.
 * Clicking on one group redirects to a page where all the group's postings made
 * by the current user are seen.
 */
class MyGroupsScreen extends React.Component {

    /**
     * Used to communicate with the server api.
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     * Parameters passed on the route used to load this screen.
     * @type {{userId: string}}
     */
    matchParams;

    /**
     * @type {{groups: GroupInfo[] | []}}
     */
    state;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler("", "", TESTING)("", TESTING);
        this.matchParams = this.props.match.params;
        this.state = {
            groups: []
        };
    }

    render() {
        const language = this.props.language;
        const txt = texts[language].myGroupsWithPostingsScreen;
        const group_ids = this.state.groups.map((x) => x.id);

        return (
            <div>
                <div>
                    <PlainNavBar title={txt.title}/>
                </div>
                <div>
                    <p> {txt.instruction} </p>
                    <hr/>
                    <GroupList groupIds={group_ids} />
                </div>
            </div>
        );

    }

    async componentDidMount() {
        const userGroups = await this.fetchUserGroups()
        Log.info("User groups: " + stringify(userGroups), this)

        this.setState({
            groups: userGroups,
        });
    }

    /**
     * Returns the groups that the user belongs to.
     * @return {Promise<GroupInfo[] | []>}
     */
    async fetchUserGroups() {
        const userId = this.matchParams.userId;

        return this.apiHandler.getUserGroups(userId);
    }

    /**
     * Returns a url used to redirect to this page.
     * @param userId {string} id of the user to load the groups of
     * @return {string}
     */
    static buildUrl(userId) {
        const route = MyGroupsScreen.ROUTE;
        return route.replace(":userId", userId);
    }

    /**
     * Returns the route path to load this page.
     * Intended for use in react router.
     * @return {string}
     */
    static get ROUTE() {
        return FAMILY_MARKET_BASE_PAGE_URL + "/users/:userId/groups";
    }

    /**
     * Returns a function that handles the redirection to this page.
     * This method should be used instead of manually handling redirection,
     * since it makes things clearer by defining navigation behaviour for this class.
     * @param history {History}
     * @param userId {string} id of the user to load the groups of
     * @return {function}
     */
    static buildRedirectionHandler(history, userId) {
        return () => {
            history.push(MyGroupsScreen.buildUrl(userId))
        }
    }
}

MyGroupsScreen.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export const MyGroupsScreenRoute = MyGroupsScreen.ROUTE;
export const buildRedirectionHandler = MyGroupsScreen.buildRedirectionHandler;

export default withLanguage(MyGroupsScreen);
