
import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import {NO_CATEGORY, NO_TN_TYPE} from "../../constants";
import Posting from "../../api/model/Posting";
import React from "react";
import PropTypes from "prop-types";
import PostingsListItem from "./PostingsListItem";
import {FAVOURITES_MODE} from "./PostingsListItem";

const CATEGORY_NOT_SET = "not-set";
const TN_TYPE_NOT_SET = "not-set";


class PostingsList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const filteredPostings = this.getFilteredPostings()
        const title = this.buildTitle();

        //TODO dovrebbero essere ordinati in base alla creation_date (è stata inserita apposta nel model)

        return (
            <div className="w-95 mx-auto">
                <h2 className="m-top-20">{title}</h2>

                {/* One item for each posting */
                    filteredPostings.map((p, idx) => {
                        return <PostingsListItem key={idx}
                                                 mode={this.props.itemMode}
                                                 posting={p}/>
                    })
                }
            </div>
        )
    }

    /**
     * Returns the title to display, which is based on the filtering criteria
     * @return {string}
     */
    buildTitle() {
        const language = this.props.language;
        const txt = texts[language].postingsLists;

        // If no filter is valid (all values are default), the title "Newest posts" should appear
        if(this.props.title){
            return this.props.title;
        }
        else if(!this.isNameFilterValid() && !this.isCategoryFilterValid()  && !this.isTnTypeFilterValid()) {
            return txt.defaultTitle;
        }
        else
        {
            // Title is like: Results for 'name' in category 'cat' of type 'type'
            const name = this.isNameFilterValid() ? this.props.filterText : "";
            const category = this.isCategoryFilterValid() ? this.props.filterCategory : "";
            const tnType = this.isTnTypeFilterValid() ?  this.props.filterTnType : "";

            return txt.titleBuilder(name, category, tnType);
        }
    }

    /**
     * Returns true if the name filter is different from default its value (empty string),
     * which would mean it should not be used as filter.
     * @return {boolean}
     */
    isNameFilterValid() {
        return this.props.filterText !== "";
    }

    /**
     * Returns true if the category filter is different from its default value,
     * which would mean it should not be used as filter.
     * @return {boolean}
     */
    isCategoryFilterValid() {
        return this.props.filterCategory !== NO_CATEGORY[this.props.language]
            && this.props.filterCategory !== CATEGORY_NOT_SET;
    }

    /**
     * Returns true if the transaction type filter is different from its default value,
     * which would mean it should not be used as filter.
     * @return {boolean}
     */
    isTnTypeFilterValid() {
        return this.props.filterTnType !== NO_TN_TYPE[this.props.language]
            && this.props.filterTnType !== TN_TYPE_NOT_SET;
    }

    /**
     * Returns only the postings passed from props that match the filtering criteria.
     * @return {Posting[]}
     */
    getFilteredPostings() {
        const allPostings = this.props.postings;
        const {filterText, filterTnType, filterCategory} = this.props;

        // If a posting matches all the filtering criteria (name, category, type),
        // then it is selected.
        const filteredPostings = [];
        for (const p of allPostings) {
            const nameMatch = this.isMatchedByText(p, filterText);
            const catMatch = this.isMatchedByCategory(p, filterCategory);
            const tnTypeMatch = this.isMatchedByTnType(p, filterTnType);

            const isMatch = nameMatch && catMatch && tnTypeMatch;
            if(isMatch) {
                filteredPostings.push(p);
            }
        }

        return filteredPostings;
    }

    /**
     * Determines if a posting name is matched by the provided text.
     * Returns true if there is a match, false otherwise.
     * @param posting {Posting}
     * @param filterText {string}
     * @return {boolean}
     */
    isMatchedByText(posting, filterText) {
        // Everything is a match if no filter is provided
        if (!this.isNameFilterValid()) {
            return true;
        }

        // Make everything lower case to perform case-insensitive research
        const nameLower = posting.name.toLowerCase();
        const filterTextLower = filterText.toLowerCase();

        return nameLower.includes(filterTextLower);
    }

    /**
     * Determines if a posting name is matched by the provided category.
     * Returns true if there is a match, false otherwise.
     * @param posting {Posting}
     * @param filterCategory {string}
     * @return {boolean}
     */
    isMatchedByCategory(posting, filterCategory) {
        // Everything is a match if no filter is provided
        if (!this.isCategoryFilterValid()) {
            return true;
        }

        return posting.category === filterCategory;
    }

    /**
     * Determines if a posting transaction type is matched by the provided transaction type.
     * Returns true if there is a match, false otherwise.
     * @param posting {Posting}
     * @param filterTnType {string}
     * @return {boolean}
     */
    isMatchedByTnType(posting, filterTnType) {
        // Everything is a match if no filter is provided
        if (!this.isTnTypeFilterValid()) {
            return true;
        }

        return posting.type === filterTnType;
    }
}

PostingsList.defaultProps = {
    postings: [],
    itemMode: FAVOURITES_MODE,
    filterText: "",
    filterTnType: TN_TYPE_NOT_SET,
    filterCategory: CATEGORY_NOT_SET,
    title: null
}

PostingsList.propTypes = {
    /**
     * Postings to display.
     */
    postings: PropTypes.arrayOf(PropTypes.instanceOf(Posting)),


    /**
     * Mode of the list items, determines which button to show.
     */
    itemMode: PropTypes.string.isRequired,

    /**
     * Text used to filter posts based on their name.
     */
    filterText: PropTypes.string,

    /**
     * Used to filter posts based on this transaction type.
     */
    filterTnType: PropTypes.string,

    /**
     * Used to filter posts based on this category.
     */
    filterCategory: PropTypes.string,

    /**
     * Passed by the withLanguage HOC, used to determine which texts to display.
     */
    language: PropTypes.string,

    /**
     * Title for FavouritesScreen
     */
    title: PropTypes.string
}

export default withLanguage(PostingsList);
