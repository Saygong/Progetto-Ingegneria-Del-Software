const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");

const React = require("react");
const Log = require("../../../../src/components/Log");
const CreatePostingButton = require("CreatePostingButton");
const SearchBar = require("../SearchBar");
const CategoryComboBox = require("../CategoryComboBox");
const TransactionTypeComboBox = require("../TransactionTypeComboBox");
const MarketplaceNavBar = require("MarketplaceNavBar");

//TODO metodi api chiamati in componentDidMount e poi setState
//TODO gestione asyncEventHandlers -> forse ha senso mettere la parola async in fondo come in C#?
//  poi bisognerebbe mettere tutti i metodi tipo OnClick, OnTextChange che richiamano props.handler come async,
//  dato che handler può essere async? -> sì


class MarketplaceScreen extends React.Component {

    /**
     * Changed by the search bar and the two combo boxes
     * @type {{filterText: string, filterTnType: string, filterCategory: string}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    constructor(props) {
        super(props);

        this.groupPostings = [];
        this.apiHandler = new ApiHandler();

        this.state = {
            filterText: "",
            filterTnType: "",
            filterCategory: ""
        };

        this.getGroupPostings = this.getGroupPostings.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleTransactionTypeChange = this.handleTransactionTypeChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    render() {
        // TODO
    }

    componentDidMount() {
        // TODO load postings
    }

    async getGroupPostings() {
        // TODO get postings from api -> component didmount
    }

    /**
     * Called when the text in the search bar is changed.
     * Updates the state accordingly.
     * @param newText {string}
     */
    handleSearchBarChange(newText) {
        this.setState({
            filterText: newText
        });
    }

    /**
     * Called when the text in the search bar is changed.
     * Updates the state accordingly.
     * @param newTnType {string}
     */
    handleTransactionTypeChange(newTnType) {
        this.setState({
            filterTnType: newTnType
        });
    }

    /**
     * Called when the text in the search bar is changed.
     * Updates the state accordingly.
     * @param newCategory {string}
     */
    handleCategoryChange(newCategory) {
        this.setState({
            filterCategory: newCategory
        });
    }
}

module.exports = MarketplaceScreen;