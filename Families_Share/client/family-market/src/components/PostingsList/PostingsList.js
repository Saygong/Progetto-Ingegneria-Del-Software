const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const PropTypes = require("prop-types");
const Log = require("../../../../src/components/Log");
const {PostingsListItem, EDIT_MODE, FAVOURITES_MODE} = require("./PostingsListItem");
import withLanguage from "../../../../src/components/LanguageContext";


class PostingsList extends React.Component {

    /**
     * Changed only if a posting is deleted.
     * @type {{postings: Posting[]}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();

        // The postings to first load are the filtered ones
        // after that, they get changed only if a posting is deleted.
        // Also, no need to bind since "this" is the object calling the function.
        this.state = {
            postings: this.getFilteredPostings()
        };
    }

    render() {
        const postingsToDisplay = this.state.postings;

        // TODO lista di PostingsListItem
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
        // Make everything lower case to perform case insensitive research
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
    title: PropTypes.string,

    /**
     * Mode of the list items, determines which button to show.
     */
    itemMode: PropTypes.oneOf([EDIT_MODE, FAVOURITES_MODE]),

    /**
     * Text used to filters posts based on their name.
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

module.exports = withLanguage(PostingsList);