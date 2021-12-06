const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
const PostingsListItem = require("./PostingsListItem");
import withLanguage from "../../../../src/components/LanguageContext";


class PostingsList extends React.Component {

    /**
     * Notes:
     * - itemMode is either "edit" or "favourites" and determines the buttons
     * that are visualized in each list item
     * - filterText filters postings based on their name
     * @type {{itemMode: string, filterTnType: string, filterCategory: string, postings: Posting[],
     *          filterText: string, title: string}}
     */
    props;

    /**
     * Changed only if a posting is deleted.
     * @type {{postings: Posting[]}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     *
     * @param props {{itemMode: string, filterTnType: string, filterCategory: string, postings: Posting[],
     *                  filterText: string, title: string}}
     */
    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();

        // The postings to first load are the filtered ones
        // after that, they get changed only if a posting is deleted.
        // Also, no need to bind since "this" is the object calling the function.
        this.state = {
            postings: this.getFilteredPostings()
        };

        this.handlePostingDeletion = this.handlePostingDeletion.bind(this);
    }

    render() {
        const postingsToDisplay = this.state.postings;

        // TODO
    }

    /**
     * Returns only the postings passed from props that match the filtering criteria.
     * @return {Posting[]}
     */
    getFilteredPostings() {
        const allPostings = this.props.postings;
        const {filterText, filterTnType, filterCategory} = this.props;
        const filteredPostings = [];

        //TODO: implementare filtro
        // https://it.reactjs.org/docs/thinking-in-react.html
        // Passo 5 della guida contiene un buon esempio di ricerca elementi fatta in maniera semplice

        return filteredPostings;
    }

    handlePostingDeletion() {
        // TODO delete the posting by querying the api and change the state
    }
}

module.exports = withLanguage(PostingsList);