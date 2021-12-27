
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import {DialogContent} from "@material-ui/core";


class DisclaimerDialog extends React.Component {

    constructor(props) {
        super(props);

    }

    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
    };

    render() {
        const {language, isOpen} = this.props;
        const txt = texts[language].disclaimer;

        return (
            <div>
                <Dialog
                    onClose={this.handleClose}
                    open={isOpen}
                >
                    <DialogTitle id="alert-dialog-title">
                        <div className="inviteDialogTitle">{txt.title}</div>
                    </DialogTitle>
                    <DialogContent>
                        <p>
                            {txt.text}
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <button className="modalAgreeButton" onClick={() => this.handleClose()}>
                            {txt.agree}
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DisclaimerDialog.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    language: PropTypes.string
};


export default withLanguage(DisclaimerDialog);

