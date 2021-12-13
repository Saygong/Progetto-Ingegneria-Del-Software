import withLanguage from "../../../../components/LanguageContext";

import Posting from "../../api/model/Posting";
import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import Tabs from "./PostingInfoTabsStyle";

//TODO non capisco funziona con tutti e 3 non vedo la differenza
import Tab from "./PostingInfoTabsStyle";
// import {Tab} from "@material-ui/core";
// import {Tab} from "react-tabs";

/**
 * Class that represents a component that displays
 * description, place and contact of a certain posting as tabs of a tab menu.
 */

class PostingInfoTabs extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const language = this.props.language;
        const posting = this.props.posting;

        return (
            <div>
                <div className="familyMtabs">
                    {/*//TODO da cancellare se va bene quello sotto*/}
                    {/*<button className="tablinks" onClick={tabInfo}>PRODUCT</button>*/}
                    {/*<button className="tablinks" onClick={tabInfo}>WHERE</button>*/}
                    {/*<button className="tablinks" onClick={tabInfo}>CONTACTS</button>*/}

                    <Tabs>
                        <Tab label="Product">
                            <div>
                                <h3>Description:</h3>
                                <p>{posting.description}</p>
                            </div>
                        </Tab>
                        <Tab label="Where">
                            <div>
                                <img src="data:image/jpeg;base64,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"/>
                                <p>{posting.contact.place}</p>
                            </div>
                        </Tab>
                        <Tab label="Contacts">
                            <div>
                                <img src="https://www.free-press.it/wp-content/uploads/2021/02/Ora-puoi-Rickroll-persone-in-4K.jpg"/>
                                <h3>Contacts:</h3>
                                <p>{posting.contact.phone_number}</p>
                                <p>{posting.contact.email}</p>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                {/*//TODO cancellare se quello sopra va bene*/}
                {/*<div id="Product" className="tab-content">*/}
                {/*    <h3>Description:</h3>*/}
                {/*    <p>{posting.description}</p>*/}
                {/*</div>*/}
                {/*<div id="Where" className="tab-content">*/}
                {/*    <p>{posting.contact.place}</p>*/}
                {/*</div>*/}
                {/*<div id="Contacts" className="tab-content">*/}
                {/*    <h3>Contacts:</h3>*/}
                {/*    <p>{posting.contact.phone_number}</p>*/}
                {/*    <p>{posting.contact.email}</p>*/}
                {/*</div>*/}
            </div>
    );
    }
}

PostingInfoTabs.defaultProps = {
    posting: Posting.EMPTY
}

PostingInfoTabs.propTypes = {
    /**
     * Posting to display the info of
     */
    posting: PropTypes.instanceOf(Posting),

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}


//TODO non ricordo se c'era già o cosa, da cancellare??
function tabInfo(evt, info="") {
    // Declare all variables
    let i, tabContent, tabLinks;

    // Get all elements with class="tabcontent" and hide them
    tabContent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    // TODO commented since it does not work: info shouldn't be a parameter, onClick doesn't accept it
    //document.getElementById(info).style.display = "block";
    //evt.currentTarget.className += " active";
}

/*
TODO tab fatto con https://www.w3schools.com/howto/howto_js_tabs.asp
 */
export default withLanguage(PostingInfoTabs);
