const React = require("react");
const ApiHandler = require("../../api/ApiHandler");
const Posting = require("../../api/model/Posting");
const Log = require("../../../../src/components/Log");
const ListItem = require("../ListItem");
const EditPostingButton = require("../EditPostingButton");
const DeletePostingButton = require("../DeletePostingButton");
const ToggleFavouriteButton = require("../ToggleFavouriteButton");
const PostingScreen = require("../PostingScreen/PostingScreen");


/**
 * Component that represents a posting as an item of a PostingsList.
 * It allows to display various buttons alongside the posting main info,
 * based on the mode that is set when it is instantiated.
 */
class PostingsListItem extends React.Component {

    /**
     * @type {{posting: Posting, mode: string, deletionHandler: function}}
     */
    props;

    /**
     * Changed by the toggle favourite button
     * @type {{isFavourite: boolean}}
     */
    state;

    /**
     * @type {ApiHandler}
     */
    apiHandler;

    /**
     * String that needs to be passed as prop in order to set the item on edit mode
     * @return {string}
     */
    static get EDIT_MODE() {
        return "edit";
    }

    /**
     * String that needs to be passed as prop in order to set the item on edit mode
     * @return {string}
     */
    static get FAVOURITES_MODE() {
        return "favourites";
    }

    /**
     *
     * @param props {{posting: Posting, mode: string, deletionHandler: function}}
     */
    constructor(props) {
        super(props);

        this.apiHandler = new ApiHandler();
        this.state = {
            isFavourite: false
        }

        this.onClick = this.onClick.bind(this);
        this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    render() {
        // TODO
        if (this.props.mode === PostingsListItem.EDIT_MODE) {
            // render edit and delete buttons
        }
        else if (this.props.mode === PostingsListItem.FAVOURITES_MODE) {
            // render toggle favourite button
            // this.state.isFavourite is passed onto the button
        }
        else {

        }
    }

    onClick() {
        // TODO send to PostingScreen
    }

    handleFavouriteChange() {
        // TODO updates the current user favourites list and change state
    }
}

module.exports = PostingsListItem;