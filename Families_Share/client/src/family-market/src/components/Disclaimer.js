
import withLanguage from "../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types" ;
import DisclaimerDialog from "./DisclaimerDialog";



class Disclaimer extends React.Component {
    constructor(props) {
        super(props);
        

        this.state = {
            disclaimerDialogIsOpen: false,
            alreadySaw: false
        };
    }


    handleDisclaimerModalOpen = () => {
        const elem = document.getElementsByTagName("body")[0];
        elem.style.overflow = "auto";
        this.setState({ alreadySaw: true})
        this.setState({ categoryModalIsOpen: true });
    };
    handleDisclaimerModalClose = () => {
        const elem = document.getElementsByTagName("body")[0];
        elem.style.overflow = "auto";
        this.setState({ categoryModalIsOpen: false });
    };



    render() {

        let {disclaimerDialogIsOpen} = this.state;
        let already = this.state.alreadySaw;

        return (
            <div>
                {window.onload = () => {
                    if (!already)
                        this.handleDisclaimerModalOpen();
                }}
                <DisclaimerDialog
                    isOpen={disclaimerDialogIsOpen}
                    handleClose={this.handleDisclaimerModalClose}
                />
            </div>
        )
    }

}

Disclaimer.propTypes = {
    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(Disclaimer);
