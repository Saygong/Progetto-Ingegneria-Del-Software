const ApiHandler = require("../src/api/ApiHandler");
const Posting = require("../src/api/Posting");
const PostingInfo = require("../src/api/PostingInfo");
const Contact = require("../src/api/Contact");
const GroupInfo = require("../src/api/GroupInfo");
const {func, element} = require("prop-types");
const {expect} = require("chai");

function getRandomString() {
    const randInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // 36 is the max number and 2 is the min because toString() accepts bases from 2 to 36
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
    let randomBase = randInt(2, 36);
    let randStr = (Math.random() + 1).toString(randomBase);
    let randLength = randInt(1, randStr.length);

    return randStr.substring(0, randLength);
}

function getRandomPostingInfo() {
    return new PostingInfo({
        name: getRandomString(),
        category: getRandomString(),
        description: getRandomString(),
        photo: "",
        type: "loan",
        contact: Contact.EMPTY
    })
}

/**
 * Performs deep assert (all properties) on two PostingInfo objects
 * @param actual {PostingInfo}
 * @param expected {PostingInfo}
 * @param assertTrue {boolean} if false, the assert checks for inequality of all properties instead
 */
function assertPostingInfo(actual, expected, assertTrue=true) {
    expect(actual.name === expected.name).toBe(true && assertTrue);
    expect(actual.description === expected.description).toBe(true && assertTrue);
    expect(actual.type === expected.type).toBe(true && assertTrue);
    expect(actual.category === expected.category).toBe(true && assertTrue);
    expect(actual.photo === expected.photo).toBe(true && assertTrue);
    expect(actual.contact.email === expected.contact.email).toBe(true && assertTrue);
    expect(actual.contact.phone_number === expected.contact.phone_number).toBe(true && assertTrue);
    expect(actual.contact.place === expected.contact.place).toBe(true && assertTrue);
}

/**
 * Performs deep assert (all properties) on two Posting objects
 * @param actual {Posting}
 * @param expected {Posting}
 * @param assertTrue {boolean} if false, the assert checks for inequality of all properties instead
 */
function assertPosting(actual, expected, assertTrue=true) {
    expect(actual.id === expected.id).toBe(true);
    expect(actual.group_id === expected.group_id).toBe(true);

    assertPostingInfo(actual, expected, assertTrue);
}

// TODO: funzioni devono essere async perché fanno query all'api
function createRandomUser() {

    const user = {
        given_name: getRandomString(),
        family_name: getRandomString(),
        number: '0123546879',
        email: 'test@email.com',
        password: getRandomString(),
        visible: true,
        language: 'en'

        //TODO: effettivamente ci va? non ha senso perché è un campo che può
        // benissimo essere inizializzato lato server
        //favourites: []
    };

    return userId;
}

function createRandomPosting(creatorId, groupId) {

    return posting;
}

function createRandomGroup(ownerId) {

    const group = {
        invite_ids: [],
        description: getRandomString(),
        location: getRandomString(),
        name: getRandomString(),
        visible: true,
        owner_id: ownerId,
        contact_type: "email",
        contact_info: getRandomString()
    };

    // TODO: per ottenere id gruppo bisogna probabilmente fare richiesta per i gruppi
    // dell'utente owner, perché quando lo crea non restituisce l'id

    return groupId;
}

function createGroupWithSomePostings() {

    return {groupId: "", postingIds: []};
}

function createUserWithSomePostings() {

    return {userId: "", postingIds: []};
}

function createRandomUserSomePostingsOnDifferentGroups() {

    return {id: "-1", groupIds: []};
}

function createUserWithSomeFavourites() {
    return {userId: "", favouritesIds: []};
}

function deleteGroup(groupId) {

}

function deleteUser(userId) {

}

function deletePosting(postingId) {

}

function setupPosting() {
    let userId = createRandomUser();
    let groupId = createRandomGroup(userId);
    let posting = createRandomPosting(userId, groupId);
    return { userId: userId, groupId: groupId, posting: posting };
}

function tearDownPosting(creatorId, groupId, postingId) {
    deletePosting(postingId);
    deleteGroup(groupId);
    deleteUser(creatorId);
}


describe('Get all group postings', function () {
    it('should return a list of all the postings of a group', function () {
        // Arrange
        const setup = () => {
            let groupPostingsObj = createGroupWithSomePostings();
            return groupPostingsObj;
        };

        const tearDown = (groupId, postingIds) => {
            deleteGroup(groupId);

            for (const pId of postingIds) {
                deletePosting(pId);
            }
        };

        let { groupId, postingIds } = setup();
        let apiHandler = new ApiHandler();

        // Act
        let actualPostings = apiHandler.getGroupPostings(groupId);

        // Assert
        for (const actualId of actualPostings) {
            let isValidId = postingIds.includes(actualId);
            expect(isValidId).toBe(true);
        }

        let isLengthEqual = actualPostings.length === postingIds.length;
        expect(isLengthEqual).toBe(true);

        // Teardown
        tearDown(groupId);
    });

    it('should return empty array when given a wrong id for a specific group', function () {
        //Arrange
        let expected = [];
        let wrongId = "-1";
        let apiHandler = new ApiHandler();

        //Act
        let actual = apiHandler.getGroupPostings(wrongId);

        //Assert
        expect(expected.length === actual.length).toBe(true);
    });
});

describe('Get single posting', function () {
    it('should return a single posting given a specific id', function () {
        // Arrange
        const setup = () => {
            return setupPosting();
        };

        const tearDown = (userId, groupId, postingId) => {
            tearDownPosting(userId, groupId, postingId);
        };

        let { userId, groupId, expectedPosting } = setup();
        let apiHandler = new ApiHandler();

        // Act
        let actualPosting = apiHandler.getPosting(expectedPosting.id);

        // Assert
        assertPosting(actualPosting, expectedPosting);

        // Teardown
        tearDown(userId, groupId, expectedPosting.id);

    });

    it('should return an empty posting when given a wrong id for a specific posting', function () {
        //Arrange
        let expected = Posting.EMPTY;
        let wrongId = "-1";
        let apiHandler = new ApiHandler();

        //Act
        let actual = apiHandler.getPosting(wrongId);

        //Assert
        assertPosting(actual, expected);
    });
});

describe('Create posting', function () {
    it('should create a posting with the given information and return the created posting', function () {
        // Arrange
        const setup = () => {
            let userId = createRandomUser();
            let groupId = createRandomGroup(userId);
            return {userId: userId, groupId: groupId};
        };

        const tearDown = (userId, groupId, postingId) => {
            tearDownPosting(userId, groupId, postingId);
        };

        let { userId, groupId } = setup();
        let apiHandler = new ApiHandler();
        let creationInfo = getRandomPostingInfo();

        // Act
        let createdPosting = apiHandler.createPosting(userId, groupId, creationInfo);

        // Assert
        // Deep equality check
        expect(createdPosting.group_id === groupId).toBe(true);
        assertPostingInfo(creationInfo, createdPosting);

        // Teardown
        tearDown(userId, groupId, createdPosting.id);
    });

    it('should return and empty posting when invalid information is provided', function () {
        //Arrange
        let expected = Posting.EMPTY;
        let wrongUserId = "-1";
        let wrongGroupId = wrongUserId;
        let wrongCreationInfo = {wrong: "wrong"};
        let apiHandler = new ApiHandler();

        //Act
        let actual = apiHandler.createPosting(wrongUserId, wrongGroupId, wrongCreationInfo);

        //Assert
        expect(actual).toEqual(expected);
    });
});

describe('Edit posting', function () {
    it('should edit a posting with the given information and return the edited posting', function () {
        // Arrange
        const setup = () => {
            return setupPosting();
        };

        const tearDown = (userId, groupId, postingId) => {
            tearDownPosting(userId, groupId, postingId);
        };

        let { userId, groupId, postingToEdit } = setup();
        let apiHandler = new ApiHandler();
        let newInfo = new PostingInfo({
            name: postingToEdit.name + "1",
            category: postingToEdit.category + "1",
            description: postingToEdit.description + "1",
            photo: postingToEdit.photo + "1",
            type: postingToEdit.type + "1",
            contact: new Contact({
                email: postingToEdit.contact.email + "1",
                place: postingToEdit.contact.place + "1",
                phoneNumber: postingToEdit.contact.phone_number + "1"
            })
        });

        // Act
        let editedPosting = apiHandler.editPosting(postingToEdit.id, newInfo);

        // Assert
        assertPosting(postingToEdit, editedPosting, false);

        // Teardown
        tearDown(userId, groupId, postingToEdit.id);

    });

    it('should return an empty posting when invalid information is provided', function () {
        //Arrange
        let expected = Posting.EMPTY;
        let wrongUserId = "-1";
        let wrongCreationInfo = {wrong: "wrong"};
        let apiHandler = new ApiHandler();

        //Act
        let actual = apiHandler.editPosting(wrongUserId, wrongCreationInfo);

        //Assert
        expect(actual).toEqual(expected);
    });
});

describe('Delete posting', function () {
    it('should delete a posting given a specific id', function () {
        // Arrange
        const setup = () => {
            return setupPosting();
        };

        // Need to make sure that the posting is deleted
        // since the api delete method is being tested
        const tearDown = (userId, groupId, postingId) => {
            tearDownPosting(userId, groupId, postingId);
        };

        let { userId, groupId, postingToDelete } = setup();
        let apiHandler = new ApiHandler();

        // Act
        isDeleted = apiHandler.deletePosting(postingToDelete.id);

        // Assert
        expect(isDeleted).toBe(true);

        // Teardown
        tearDown(userId, groupId, postingToDelete.id);
    });

    it('should return false given a wrong id for a specific posting', function () {
        //Arrange
        let wrongPostingId = "-1";
        let wrongCreationInfo = {wrong: "wrong"};
        let apiHandler = new ApiHandler();

        //Act
        let isDeleted = apiHandler.deletePosting(wrongPostingId);

        //Assert
        expect(isDeleted).toBe(false);
    });
});

describe('Get all user postings', function () {
    it('should return a list of all the postings of a user, grouped by group info', function () {
        // Arrange
        const setup = () => {

        };

        const tearDown = () => {

        };


        // Act


        // Assert

    });

    it('should return an empty array when given a wrong id for a specific user', function () {

    });
});

describe('Get user favourite postings', function () {
    it('should return a list of all the postings marked as favourite by a specific user', function () {
        // Arrange
        const setup = () => {

        };

        const tearDown = () => {

        };


        // Act


        // Assert

    });

    it('should return an empty array when given a wrong id for a specific user', function () {

    });
});

describe('Edit user favourite postings', function () {
    it('should return the new edited list of favourite posting ids of the specific user', function () {
        // Arrange
        const setup = () => {

        };

        const tearDown = () => {

        };


        // Act


        // Assert

    });

    it('should return an empty array given a wrong id for a specific user', function () {

    });
});

