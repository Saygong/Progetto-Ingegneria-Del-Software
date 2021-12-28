
import withLanguage from "../../../components/LanguageContext";
import texts from "../texts";
import React from "react";
import PropTypes from "prop-types";
import CategoryDialog from "./CategoryDialog";


class CategorySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryModalIsOpen : false
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }


    handleCategoryModalOpen = () => {
        const elem = document.getElementsByTagName("body")[0];
        elem.style.overflow = "auto";
        this.setState({ categoryModalIsOpen: true });
    };
    handleCategoryModalClose = () => {
        const elem = document.getElementsByTagName("body")[0];
        elem.style.overflow = "auto";
        this.setState({ categoryModalIsOpen: false });
    };

    render() {
        // Get texts based on current language
        const language = this.props.language;
        const txt = texts[language].categoryComboBox;
        const {categoryModalIsOpen} = this.state
        return (
            <div>
                <div>
                    <span>{txt.description}</span>
                </div>
                <div className="w-100 text-center">

                    <button
                        className="categoryButton"
                        onClick={this.handleCategoryModalOpen}
                    >
                        <span>{this.props.value}</span>
                    </button>

                </div>

                <CategoryDialog
                    isOpen={categoryModalIsOpen}
                    handleClose={this.handleCategoryModalClose}
                    handleInvite={this.handleInvite}
                    inviteType="member"
                    categoryChangeHandler={this.handleCategoryChange}
                />

            </div>

        )
    }

    /**
     * Called when the selected category in the combobox changes.
     * @param newCategory {string}
     */
    async handleCategoryChange(newCategory) {
        this.props.categoryChangeHandler(newCategory);
    }
}

CategorySelector.propTypes = {
    value: PropTypes.string.isRequired,
    categoryModalIsOpen: PropTypes.bool,
    /**
     * Function that handles what happen when the selected category is changed
     */
    categoryChangeHandler: PropTypes.func.isRequired,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string
}

export default withLanguage(CategorySelector);
