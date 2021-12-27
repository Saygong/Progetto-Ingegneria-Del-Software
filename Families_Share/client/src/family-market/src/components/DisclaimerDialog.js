import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import withLanguage from "../../../components/LanguageContext";
import texts from "../texts";
import {DialogContent} from "@material-ui/core";


class DisclaimerDialog extends React.Component {

    constructor(props) {
        super(props);
    }


    handleClose = choice => {
        const { handleClose } = this.props;
        handleClose(choice);
    };


    render() {
        const {language, isOpen} = this.props;
        const txt = texts[language].disclaimer;

        return (
            <div>
                <Dialog
                    open={isOpen === undefined || isOpen === null ? false : isOpen}
                    onClose={(event, reason) => {
                        alert(txt.error);
                    }}
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
                        <Button
                            onClick={() => this.handleClose("agree")}
                            color="primary"
                            autoFocus
                        >
                            {txt.agree}
                        </Button>
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

