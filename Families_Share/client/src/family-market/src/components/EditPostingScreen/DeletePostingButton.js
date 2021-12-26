import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";

import {DEBUG} from "../../constants";

import ApiHandler from "../../api/ApiHandler";

import React from "react";
import PropTypes from "prop-types";
import Texts from "../../../../Constants/Texts";
import ConfirmDialog from "../../../../components/ConfirmDialog";


/**
 * Class that represents a button used to delete something.
 */
class DeletePostingButton extends React.Component {

    /**
     * Used to communicate with the server api.
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler("", "", DEBUG);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            confirmDialogIsOpen: false,
            confirmDialogTitle: "",
            optionsModalIsOpen: false
        };

    }

    handleConfirmDialogClose = async (choice) => {
        const { confirmDialogAction } = this.state;
        if (choice === "agree") {
            await this.handleClick();
        }
        this.setState({
            confirmDialogIsOpen: false,
            confirmDialogTitle: "",
            confirmDialogAction: ""
        });
    };

    handleConfirmDialogOpen = action => {
        const { language } = this.props;
        const texts = Texts[language].managePlanScreen;
        const confirmDialogTitle =
            action === "delete" ? texts.deleteConfirm : texts.exportConfirm;
        this.setState({
            confirmDialogTitle,
            confirmDialogAction: action,
            confirmDialogIsOpen: true,
            optionsModalIsOpen: false
        });
    };



    render() {
        // TODO (magari aggiungere pure una finestra di dialogo per dire "sei sicuro"?
        const language = this.props.language;
        const txt = texts[language].deletePostingButton
        const buttonText = txt.text;
        const {confirmDialogIsOpen} = this.state
        return (
            <div>
                <ConfirmDialog
                    title={txt.titleDialog}
                    isOpen={confirmDialogIsOpen}
                    handleClose={this.handleConfirmDialogClose}
                />
                <button className="buttonEditPosting"  onClick={this.handleConfirmDialogOpen}>
                    {buttonText}
                </button>

            </div>
        )
    }

    /**
     * Called when the button is clicked.
     * Deletes the posting and calls the redirection handler passed as prop.
     * @return {Promise<void>}
     */
    async handleClick() {
        await this.handleDelete();
        this.props.redirectionHandler();
    }

    /**
     * Deletes the posting specified in the props.
     * @return {Promise<void>}
     */
    async handleDelete() {
        // Delete the posting by calling api
        const postingId = this.props.postingId;
        await this.apiHandler.deletePosting(postingId);
    }
}

DeletePostingButton.propTypes = {
    /**
     * Id of the posting to delete if the button is pressed.
     */
    postingId: PropTypes.string.isRequired,

    /**
     * Function that handles the redirection after the posting has been deleted
     */
    redirectionHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(DeletePostingButton);
