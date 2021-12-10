import React from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import GroupListItem from "./GroupListItem";
import withLanguage from "./LanguageContext";

// Needed to handle Family Market redirection
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {FAMILY_MARKET_BASE_PAGE_URL} from "../family-market/src/constants";

const {buildRedirectionHandler} = require("../family-market/src/components/MyPostingsScreens/MyGroupPostingsScreen");


const Log = require("./Log");
function redirectToGroupMainScreen() {
    const { history } = this.props;
    const { group } = this.state;

    Log.info("Redirecting to GroupMainScreen...", this);

    history.push(`/groups/${group.group_id}/activities`);
}

function RedirectToGroupPostingsScreen() {
    const history = useHistory();
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const groupId = JSON.parse(localStorage.getItem("group")).id;
    const redirectionHandler = buildRedirectionHandler(history, userId, groupId);

    Log.info("Redirecting to MyGroupPostingsScreen...", this);

    redirectionHandler();
}

const GroupList = ({ groupIds }) => {
  const { length } = groupIds;
  const blocks = [...Array(Math.ceil(length / 4)).keys()];

  // Determine which navigation handler would be correct based on the current location (route)
  let navigationHandler = null;
  let currentLocation = useLocation();
  if (currentLocation.pathname.includes(FAMILY_MARKET_BASE_PAGE_URL)) {
      // we are in the Family Market extension
      navigationHandler = RedirectToGroupPostingsScreen;
  }
  else {
      navigationHandler = redirectToGroupMainScreen;
  }


  return (
    <div className="suggestionsContainer">
      <ul>
        {blocks.map((block, blockIndex) => {
          let indexes;
          if (length <= 4) {
            indexes = [...Array(length).keys()];
          } else {
            indexes = [
              ...Array(
                (block + 1) * 4 <= length ? 4 : length - block * 4
              ).keys()
            ].map(x => block * 4 + x);
          }
          return (
            <LazyLoad key={blockIndex} height={350} once offset={150}>
              {indexes.map(index => (
                <li key={index} style={{ margin: "1rem 0" }}>
                  <GroupListItem groupId={groupIds[index]}
                                 navigationHandler={navigationHandler}/>
                </li>
              ))}
            </LazyLoad>
          );
        })}
      </ul>
    </div>
  );
};

GroupList.propTypes = {
  groupIds: PropTypes.array
};

export default withLanguage(GroupList);
