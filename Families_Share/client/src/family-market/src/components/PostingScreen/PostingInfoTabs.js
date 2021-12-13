import withLanguage from "../../../../components/LanguageContext";

import Posting from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";


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
                <div className="tab">
                    <button className="tablinks" onClick="tabInfo(event, 'Product')">PRODUCT</button>
                    <button className="tablinks" onClick="tabInfo(event, 'Where')">WHERE</button>
                    <button className="tablinks" onClick="tabInfo(event, 'Contacts')">CONTACTS</button>
                </div>


                <div id="Product" className="tabcontent">
                    <h3>Description:</h3>
                    <p>{posting.description}</p>
                </div>

                <div id="Where" className="tabcontent">
                    <p>{posting.contact.place}</p>
                </div>

                <div id="Contacts" className="tabcontent">
                    <h3>Contacts:</h3>
                    <p>{posting.contact.phone_number}</p>
                    <p>{posting.contact.email}</p>
                </div>
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

//TODO non è usato che serve?
function tabInfo(evt, info) {
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
    document.getElementById(info).style.display = "block";
    evt.currentTarget.className += " active";
}

/*
TODO tab fatto con https://www.w3schools.com/howto/howto_js_tabs.asp
 */
export default withLanguage(PostingInfoTabs);
