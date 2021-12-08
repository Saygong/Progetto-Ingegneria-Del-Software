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
        const filteredPostings = [];
        for (const p of allPostings) {
            //TODO: implementare filtro
            // https://it.reactjs.org/docs/thinking-in-react.html
            // Passo 5 della guida contiene un buon esempio di ricerca elementi fatta in maniera semplice
        }

        return filteredPostings;
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

PostingsList.defaultProps = {
    postings: PropTypes.arrayOf(PropTypes.instanceOf(Posting)),
    title: PropTypes.string,
    iteMode: PropTypes.oneOf([EDIT_MODE, FAVOURITES_MODE]),
    filterText: PropTypes.string,
    filterTnType: PropTypes.string,
    filterCategory: PropTypes.string
}

module.exports = withLanguage(PostingsList);