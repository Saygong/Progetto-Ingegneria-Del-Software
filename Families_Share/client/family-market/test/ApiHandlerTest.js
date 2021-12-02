const ApiHandler = require("../src/api/ApiHandler");
const Posting = require("../src/api/Posting");
const PostingInfo = require("../src/api/PostingInfo");
const Contact = require("../src/api/Contact");
const GroupInfo = require("../src/api/GroupInfo");
const PostingsWithGroupInfo = require("../src/api/PostingsWithGroupInfo");
const {expect} = require("chai"); //TODO: installare chai?

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

function isNullOrUndefined(x) {
    return x === undefined || x === null;
}

/**
 * Performs deep asserts on the two Posting lists.
 * @param actualPostings {Array<Posting>}
 * @param expectedPostings {Array<Posting>}
 */
function strictAssertPostingList(actualPostings, expectedPostings) {
    expect(actualPostings.length === expectedPostings.length).toBe(true);

    for (const actual of actualPostings) {
        let expected = expectedPostings.find(p => p.id === actual.id);

        expect(isNullOrUndefined(expected)).toBe(false);
        strictAssertPosting(actual, expected);
    }
}

/**
 * Performs deep asserts for equality (default) or inequality of all properties
 * of the two provided PostingInfo objects
 * @param actual {Posting}
 * @param expected {Posting}
 * @param assertTrue {boolean} if false, the assert checks for inequality of all properties instead
 */
function strictAssertPosting(actual, expected, assertTrue=true) {
    expect(actual.id === expected.id).toBe(assertTrue);
    expect(actual.group_id === expected.group_id).toBe(assertTrue);

    strictAssertPostingInfo(actual, expected, assertTrue);
}

/**
 * Performs deep asserts for equality (default) or inequality of all properties
 * of the two provided PostingInfo objects
 * @param actual {PostingInfo}
 * @param expected {PostingInfo}
 * @param assertTrue {boolean} if false, the assert checks for inequality of all properties instead
 */
function strictAssertPostingInfo(actual, expected, assertTrue=true) {
    expect(actual.name === expected.name).toBe(assertTrue);
    expect(actual.description === expected.description).toBe(assertTrue);
    expect(actual.type === expected.type).toBe(assertTrue);
    expect(actual.category === expected.category).toBe(assertTrue);
    expect(actual.photo === expected.photo).toBe(assertTrue);
    expect(actual.contact.email === expected.contact.email).toBe(assertTrue);
    expect(actual.contact.phone_number === expected.contact.phone_number).toBe(assertTrue);
    expect(actual.contact.place === expected.contact.place).toBe(assertTrue);
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

/**
 *
 * @return {{postings: *[], groupId: string, userId: string}}
 */
function createUserWithSomePostingsSameGroup(userId="") {
    if (userId === "") {
        userId = createRandomUser();
    }



    return {userId: userId, groupId: "", postings: []};
}

/**
 *
 * @return {{postingsByGroup: Array<PostingsWithGroupInfo>, userId: string}}
 */
function createUserWithSomePostingsDifferentGroups() {

    return {userId: "", postingsByGroup: []};
}

/**
 *
 * @return {{postings: *[], groupId: string, userId: string}}
 */
function createGroupWithSomePostings() {

    return createUserWithSomePostingsSameGroup();
}

/**
 *
 * @return {{favouritePostings: *[], groupIds: *[], userId: string}}
 */
function createUserWithSomeFavourites() {
    let {userId, postingsByGroup} = createUserWithSomePostingsDifferentGroups()
    xxx

    return {userId: userId, groupIds: groupIds, favouritePostings: postings};
}

function deleteGroup(groupId) {

}

function deleteUser(userId) {

}

function deletePosting(postingId) {

}

/**
 * Creates a user, a group and a posting made by that user in that group
 * and returns group id, user id and the posting object.
 *
 * Both a user and group are created to simulate as accurately as possible a real user
 * situation, since a user must create a posting on a certain group.
 * To be even more realistic the user should belong to that group, but in this case
 * it's good enough.
 * @return {{groupId, posting, userId}}
 */
function setupPosting() {
    let userId = createRandomUser();
    let groupId = createRandomGroup(userId);
    let posting = createRandomPosting(userId, groupId);
    return {userId: userId, groupId: groupId, posting: posting};
}

/**
 * Deletes from the database the user, group and posting with the specified id.
 * Creator and group ids are passed because a posting is created along with a group and a user.
 * @param creatorId
 * @param groupId
 * @param postingId
 */
function tearDownPosting(creatorId, groupId, postingId) {
    tearDownPostings([creatorId], [groupId], [postingId]);
}

/**
 * Deletes from the database the provided postings, groups and users.
 * @param creatorIds
 * @param groupIds
 * @param postingIds
 */
function tearDownPostings(creatorIds, groupIds, postingIds) {
    for (const pId of postingIds) {
        deletePosting(pId);
    }

    for (const groupId of groupIds) {
        deleteGroup(groupId);
    }

    for (const userId of creatorIds) {
        deleteUser(userId);
    }
}


describe('Get all group postings', function () {
    it('should return a list of all the postings of a group', function () {
        // Arrange
        const setup = () => {
            return createGroupWithSomePostings();
        };

        const tearDown = (userId, groupId, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            tearDownPostings([userId], [groupId], postingIds);
        };

        let { userId, groupId, postings } = setup();
        let apiHandler = new ApiHandler();

        // Act
        let actualPostings = apiHandler.getGroupPostings(groupId);

        // Assert
        strictAssertPostingList(actualPostings, postings);

        // Teardown
        tearDown(userId, groupId, postings);
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
        strictAssertPosting(actualPosting, expectedPosting);

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
        strictAssertPosting(actual, expected);
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
        strictAssertPostingInfo(creationInfo, createdPosting);

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
        strictAssertPosting(actual, expected);
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
        // Id has to be the same but the rest of the info was changed
        expect(editedPosting.id === postingToEdit.id).toBe(true);
        expect(editedPosting.group_id === postingToEdit.group_id).toBe(true);
        strictAssertPostingInfo(postingToEdit, editedPosting, false);

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
        let isDeleted = apiHandler.deletePosting(postingToDelete.id);

        // Assert
        expect(isDeleted).toBe(true);

        // Teardown
        tearDown(userId, groupId, postingToDelete.id);
    });

    it('should return false given a wrong id for a specific posting', function () {
        //Arrange
        let wrongPostingId = "-1";
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
            return createUserWithSomePostingsDifferentGroups();
        };

        const tearDown = (userId, postingsByGroup) => {
                const postingIds = [];
                const groupIds = [];
                for (const item of postingsByGroup) {
                    groupIds.push(item.groupInfo.id);

                    for (const p of item.postings) {
                        postingIds.push(p.id);
                    }
                }

                tearDownPostings([userId], groupIds, postingIds);
            };

        let {userId, postingsByGroup} = setup();
        let apiHandler = new ApiHandler();

        // Act
        let actualPostingsByGroup = apiHandler.getUserPostings(userId)

        // Assert
        for (const actual of actualPostingsByGroup) {
            let expectedGroup = postingsByGroup.find(g => g.groupInfo.id === actual.groupInfo.id);
            expect(isNullOrUndefined(expectedGroup)).toBe(false);

            strictAssertPostingList(actual.postings, expectedGroup.postings);
        }

        // Teardown
        tearDown(userId, postingsByGroup);
    });

    it('should return an empty array when given a wrong id for a specific user', function () {
        //Arrange
        let expected = [];
        let wrongId = "-1";
        let apiHandler = new ApiHandler();

        //Act
        let actual = apiHandler.getUserPostings(wrongId);

        //Assert
        expect(expected.length === actual.length).toBe(true);
    });
});

describe('Get user favourite postings', function () {
    it('should return a list of all the postings marked as favourite by a specific user', function () {
        // Arrange
        const setup = () => {
            return createUserWithSomeFavourites();
        };

        const tearDown = (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            tearDownPostings([userId], groupIds, postingIds);
        };

        let {userId, groupIds, postings} = setup();
        let apiHandler = new ApiHandler();

        // Act
        let actualPostings = apiHandler.getUserFavouritePostings(userId);

        // Assert
        strictAssertPostingList(actualPostings, postings);

        // Teardown
        tearDown(userId, groupIds, postings);

    });

    it('should return an empty array when given a wrong id for a specific user', function () {
        //Arrange
        let expected = [];
        let wrongId = "-1";
        let apiHandler = new ApiHandler();

        //Act
        let actual = apiHandler.getUserFavouritePostings(wrongId);

        //Assert
        expect(expected.length === actual.length).toBe(true);
    });
});

describe('Edit user favourite postings', function () {
    it('should return the new edited list of favourite posting ids of the specific user', function () {
        // Arrange
        const setup = () => {
            return createUserWithSomeFavourites();
        };

        const tearDown = (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            tearDownPostings([userId], groupIds, postingIds);
        };

        let {userId, groupIds, favouritePostings} = setup();
        let apiHandler = new ApiHandler();

        // Take only postings on odd indexes to make a different id list
        let newFavouritesIds = [];
        let isOdd = true;
        for (const fav of favouritePostings) {
            if (isOdd) {
                newFavouritesIds.push(fav.id);

                isOdd = false;
            }

            if (!isOdd) {
                isOdd = true;
            }
        }

        // Act
        let actualFavouritesIds = apiHandler.editUserFavourites(userId, newFavouritesIds);
        let actualFavourites = apiHandler.getUserFavouritePostings(userId)

        // Assert
        // First check that the ids lists are equal
        let isLengthEqual = actualFavouritesIds.length === newFavouritesIds.length;
        expect(isLengthEqual).toBe(true);

        for (const actualId of actualFavouritesIds) {
            let isValid = newFavouritesIds.includes(actualId);
            expect(isValid).toBe(true);
        }

        // Then check that the actual fetched postings correspond to the edited ids
        isLengthEqual = actualFavouritesIds.length === actualFavourites.length;
        expect(isLengthEqual).toBe(true);

        for (const actualFav of actualFavourites) {
            let isValid = newFavouritesIds.includes(actualFav.id);
            expect(isValid).toBe(true);
        }

        // Teardown
        tearDown(userId, groupIds, favouritePostings);

    });

    it('should return an empty array given a wrong id for a specific user', function () {
        //Arrange
        let expected = [];
        let wrongId = "-1";
        let newFavourites = []
        let apiHandler = new ApiHandler();

        //Act
        let actual = apiHandler.editUserFavourites(wrongId, newFavourites);

        //Assert
        expect(expected.length === actual.length).toBe(true);
    });
});

