const CATEGORIES = ["1", "2", "3", "4"];
const TN_TYPES = ["loan", "donation"];
const FAMILY_MARKET_BASE_URL = "/family-market"
const MARKETPLACE_SCREEN_URL = FAMILY_MARKET_BASE_URL + "/marketplace";
const POSTING_SCREEN_URL = FAMILY_MARKET_BASE_URL + "/posting";
const EDIT_POSTING_SCREEN_URL = FAMILY_MARKET_BASE_URL + "/posting/edit";
const MY_FAVOURITES_SCREEN_URL = FAMILY_MARKET_BASE_URL + "/favourites";
const GROUPS_WITH_POSTINGS_SCREEN_URL = FAMILY_MARKET_BASE_URL + "/postings/groups";

// Here a better route would be like "/postings/groups/:groupId, but:
//  - groupId is already passed as prop and not route parameter;
//  - this way it is easier to use since you just plug in the constant and you get the path
const GROUP_POSTINGS_SCREEN_URL = FAMILY_MARKET_BASE_URL + "/groupPostings";

module.exports = {
    CATEGORIES,
    TN_TYPES,
    MARKETPLACE_SCREEN_URL,
    POSTING_SCREEN_URL,
    EDIT_POSTING_SCREEN_URL,
    MY_FAVOURITES_SCREEN_URL,
    MY_GROUPS_WITH_POSTINGS_SCREEN_URL: GROUPS_WITH_POSTINGS_SCREEN_URL,
    MY_GROUP_POSTINGS_SCREEN_URL: GROUP_POSTINGS_SCREEN_URL
};