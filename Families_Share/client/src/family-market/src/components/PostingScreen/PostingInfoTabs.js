
import withLanguage from "../../../../components/LanguageContext";
import Posting from "../../api/model/Posting";
import React from "react";
import PropTypes from "prop-types";
import texts from "../../texts";
import Tabs from "./PostingInfoTabsStyle";


import Tab from "./PostingInfoTabsStyle";
import IconItem from "../IconItem";
import axios from "axios";
import Log from "../../../../components/Log";
import LoadingSpinner from "../../../../components/LoadingSpinner";

/**
 * Class that represents a component that displays
 * description, place and contact of a certain posting as tabs of a tab menu.
 */

class PostingInfoTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ownerName: ""
        };
    }

    render() {
        const language = this.props.language;
        const posting = this.props.posting;
        const txt = texts[language].postingInfoTabs;
        const username = this.state.ownerName.given_name + " " + this.state.ownerName.family_name;

        return (
            <div>
                <div className="family-m-tabs">
                    <Tabs>
                        <Tab label={txt.product}>
                            <div>
                                <h3 className="forTabsTitle">{txt.desc}</h3>
                                <span className="little-text fitText">{posting.description}</span>
                            </div>
                        </Tab>


                        <Tab label={txt.where}>
                            <div className="w-80 mx-auto text-left">
                                <div className="row no-gutters">
                                    <div className="col-2-10 text-center">
                                        <IconItem iconPath="fas fa-map-marker-alt" theme="family-icon-dark"/>
                                    </div>
                                    <div className="col-8-10">
                                        <span className="little-text">{posting.contact.place}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab>


                        <Tab label={txt.contact}>
                            <div className="w-80 mx-auto text-left">

                                <div className="row no-gutters">
                                    <div className="col-2-10 text-center">
                                        <IconItem iconPath="fas fa-user" theme="family-icon-dark"/>
                                    </div>
                                    <div className="col-8-10">

                                        <span className="little-text"> {username} </span>
                                    </div>
                                </div>
                                <br/>

                                <div className="row no-gutters">
                                    <div className="col-2-10 text-center">
                                        <IconItem iconPath="fas fa-phone" theme="family-icon-dark"/>
                                    </div>
                                    <div className="col-8-10">
                                        <span className="little-text">{posting.contact.phone_number}</span>
                                    </div>
                                </div>
                                <br/>

                                <div className="row no-gutters">
                                    <div className="col-2-10 text-center">
                                        <IconItem iconPath="fas fa-envelope" theme="family-icon-dark"/>
                                    </div>
                                    <div className="col-8-10">
                                        <span className="little-text">{posting.contact.email}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }


     async componentDidMount() {

         const user_id = this.props.posting.user_id;
         const user_name = await getUserName(user_id);


         this.setState({
             ownerName: user_name,
             fetchedData: true
         })
     }
}

const getUserName = (user_id) => {
    return axios
        .get(`/api/users/${user_id}/profile`)
        .then(response => {
            let name = response.data;
            return {
                given_name: name.given_name,
                family_name: name.family_name
            };
        })
        .catch(error => {
            Log.error(error);
            return {
                given_name: "",
                family_name: ""
            };
        });
};


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
