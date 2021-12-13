import withLanguage from "../../../../components/LanguageContext";
import texts from "../../texts";
import Posting from "../../api/model/Posting";

import React from "react";
import PropTypes from "prop-types";
import Log from "../../../../components/Log";
import PostingsListItem from "./PostingsListItem";
import {FAVOURITES_MODE} from "./PostingsListItem";


class PostingsList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const filteredPostings = this.getFilteredPostings()

        // TODO debug
        //console.log("Filtered Postings: " + JSON.stringify(filteredPostings, null, 4));

        const title = this.buildTitle();

        return (
            <div>
                <h2>{title}</h2>
                {/* One item for each posting */
                    filteredPostings.map((p, idx) => {
                        return <PostingsListItem key={idx} mode={this.props.itemMode}
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
        const txt = texts[language].postingsLists.title;

        const nameFilter = this.props.filterText;
        const namePart = `${txt.namePart} "${nameFilter}"`;

        const catFilter = this.props.filterCategory;
        const catPart = `${txt.categoryPart} "${catFilter}"`;

        const tnTypeFilter = this.props.filterTnType;
        const typePart = `${txt.transactionTypePart} "${tnTypeFilter}"`;

        if(!(nameFilter || catFilter || tnTypeFilter)) {
            return "Newest posts" // TODO da aggiungere a texts e/o modificare
        }
        else
        {
            // title is like "Results for "name" in category "cat" of type "type"
            return namePart + catPart + typePart;
        }
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
        if (filterText === "") {
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
        if (filterCategory === "") {
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
        if (filterTnType === "") {
            return true;
        }

        return posting.type === filterTnType;
    }
}

PostingsList.defaultProps = {
    postings: [],
    title: "",
    itemMode: FAVOURITES_MODE,
    filterText: "",
    filterTnType: "",
    filterCategory: ""
}

PostingsList.propTypes = {
    /**
     * Postings to display.
     */
    postings: PropTypes.arrayOf(PropTypes.instanceOf(Posting)),

   ///** TODO al momento inutle perché titolo è gestito internamente
   // * Title attached on top of the actual list of postings
   // */
   //title: PropTypes.string,

    /**
     * Mode of the list items, determines which button to show.
     */
    itemMode: PropTypes.string,

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
    language: PropTypes.string
}

export default withLanguage(PostingsList);
