
import texts from "../texts";
import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {withRouter} from "react-router-dom";
import withLanguage from "../../../components/LanguageContext";
import {CATEGORIES} from "../constants";

class CategoryDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);

    }

    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
    };

    render() {

        const isOpen = this.props.isOpen;
        const language = this.props.language;
        const txt = texts[language].categoryDialog;
        let key = CATEGORIES[language];


        return (
            <div>
                <Dialog
                    onClose={this.handleClose}
                    style={{"overflowY":'auto'}}
                    open={isOpen}
                >
                    <DialogTitle>
                        <div className="inviteDialogTitle">{txt.header}</div>
                    </DialogTitle>
                    <DialogContent>

                        <div className="mx-auto categoryButtonContainer">
                            {
                                key.map((cat, index) => (
                                    <button
                                        className="modalCategoryButton"
                                        key={index}
                                        onClick={async () => {
                                                await this.handleCategoryChange(cat);
                                                this.handleClose()
                                            }
                                        }
                                    >
                                        <h5>{cat}</h5>
                                    </button>
                                ))
                            }
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }


    /**
     * Called when the selected category in the combobox changes.
     * @param newCategory {string}
     */
    async handleCategoryChange(newCategory) {
        this.props.categoryChangeHandler(newCategory);
    }
}


CategoryDialog.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    language: PropTypes.string,
    /**
     * Function that handles what happen when the selected category is changed
     */
    categoryChangeHandler: PropTypes.func.isRequired,
};

export default withRouter(withLanguage(CategoryDialog));
