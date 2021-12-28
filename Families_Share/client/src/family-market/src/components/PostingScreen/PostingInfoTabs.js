import withLanguage from "../../../../components/LanguageContext";

import Posting from "../../api/model/Posting";
import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import texts from "../../texts";
import Tabs from "./PostingInfoTabsStyle";


import Tab from "./PostingInfoTabsStyle";

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
        const txt = texts[language].postingInfoTabs;


        return (
            <div>
                <div className="family-m-tabs">
                    <Tabs>
                        <Tab label={txt.product}>
                            <div className="">
                                <h2 className="forTabsTitle">{txt.desc}</h2>
                                <p>{posting.description}</p>
                            </div>
                        </Tab>
                        <Tab label={txt.where}>
                            <div>
                                <h2 className="forTabsTitle">{txt.place}</h2>
                                <p>{posting.contact.place}</p>
                            </div>
                        </Tab>
                        <Tab label={txt.contact}>
                            <div>
                                {/* TODO aggiungere informazioni utente (nome)*/}
                                <h2 className="forTabsTitle">{txt.phone}</h2>
                                <p>{posting.contact.phone_number}</p>
                                <hr/>
                                <h2 className="forTabsTitle">{txt.mail}</h2>
                                <p>{posting.contact.email}</p>
                            </div>
                        </Tab>
                    </Tabs>
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

export default withLanguage(PostingInfoTabs);
