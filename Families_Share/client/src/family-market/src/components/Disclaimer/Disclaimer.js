
import withLanguage from "../../../../components/LanguageContext";
import React from "react";
import PropTypes from "prop-types" ;
import DisclaimerDialog from "./DisclaimerDialog";



class Disclaimer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disclaimerDialogIsOpen: true
        };
        this.handleDisclaimerModalClose = this.handleDisclaimerModalClose.bind(this);
    }


    handleDisclaimerModalClose = () => {
        const elem = document.getElementsByTagName("body")[0];
        elem.style.overflow = "auto";
        this.setState({ categoryModalIsOpen: false });
        this.props.handle();
    };



    render() {
        let {disclaimerDialogIsOpen} = this.state;

        return (
            <div>
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
    language: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    handle: PropTypes.func

}

export default withLanguage(Disclaimer);
