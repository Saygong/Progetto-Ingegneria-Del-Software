import Log from "../../src/components/Log";

const ApiHandler = require("../src/api/ApiHandler");
const Posting = require("../src/api/Posting");
const PostingInfo = require("../src/api/PostingInfo");
const Contact = require("../src/api/Contact");
const GroupInfo = require("../src/api/GroupInfo");
const PostingsWithGroupInfo = require("../src/api/PostingsWithGroupInfo");
import axios from "axios";
import {polarToCartesian} from "recharts/lib/util/PolarUtils";

const POSTINGS_BASE_URL = ApiHandler.POSTINGS_BASE_URL;
const USER_EXT_BASE_URL = ApiHandler.USER_EXT_BASE_URL;

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
 * Returns true if the provided object is null or undefined.
 * @param x object to test
 * @return {boolean}
 */
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
/**
 *
 * @return {Promise<string>}
 */
async function createRandomUser() {
    const user = {
        given_name: getRandomString(),
        family_name: getRandomString(),
        number: '0123546879',
        email: 'test@email.com',
        password: getRandomString(),
        visible: true,
        language: 'en'

        //TODO: effettivamente ci va? non ha senso perché è un campo che può
        // benissimo essere inizializzato lato server. Parlare con ruie/geh
        //favourites: []
    };

    // in test.js: await chai.request(server).post('/api/users').send(user2)
    const routeUrl = "/api/users";
    const response = await axios.post(routeUrl, user)
        .then(response => {
            console.log(`Successfully created user [${response.data.id}]`);
            console.log(response)

            // see line 154 of user-routes.js to understand what data is returned
            return response;
        })
        .catch(error => {
            console.log(`Error while creating user`)
            console.log(error);
        });

    const userId = response.data.id;
    return userId;
}

/**
 *
 * @param ownerId {string}
 * @return {Promise<GroupInfo>}
 */
async function createRandomGroup(ownerId) {
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

    // in test.js:
    // await chai.request(server).post('/api/groups').send(group2).set('Authorization', user.token)
    const routeUrl = "/api/groups";
    const response = await axios.post(routeUrl, group)
        .then(response => {
            console.log(`Successfully created group [${response.data.group_id}]`);
            console.log(response)

            return response;
        })
        .catch(error => {
            console.log(`Error while creating group`)
            console.log(error);
        });

    const groupId = response.data.group_id;
    const groupName = response.data.name;

    return new GroupInfo({id: groupId, name: groupName});
}

/**
 *
 * @param creatorId
 * @param groupId
 * @return {Promise<Posting>}
 */
async function createRandomPosting(creatorId, groupId) {
    const rndInfo = getRandomPostingInfo();
    const creationData = {
        user_id: creatorId,
        group_id: groupId,
        ...rndInfo
    };

    const routeUrl = `${POSTINGS_BASE_URL}/`;
    const response = await axios.post(routeUrl, creationData)
        .then(response => {
            console.log(`Successfully created posting [${response.data.id}]`);
            console.log(response)

            return response;
        })
        .catch(error => {
            console.log(`Error while creating posting`)
            console.log(error);
        });

    const posting = new Posting(response.data);
    return posting;
}


/**
 *
 * @return {Promise<{groupId: string, postings: *[], userId: string}>}
 */
async function createUserWithSomePostingsSameGroup() {
    const userId = await createRandomUser();
    const groupInfo = await createRandomGroup(userId);

    const postings = [];
    const nPostings = 5;
    for (let i = 0; i < nPostings; i++) {
        const p = await createRandomPosting(userId, groupInfo.id);
        postings.push(p);
    }

    return {userId: userId, groupId: groupInfo.id, postings: postings};
}

/**
 *
 * @return {{postingsByGroup: Array<PostingsWithGroupInfo>, userId: string}}
 */
async function createUserWithSomePostingsDifferentGroups() {
    const userId = await createRandomUser();

    // For each group, create postings,
    // then create a PostingsWithGroupInfo object
    const nGroups = 3;
    const postingsByGroup = []
    for (let i = 0; i < nGroups; i++) {
        const gInfo = await createRandomGroup(userId);

        const postings = [];
        const nPostings = 3;
        for (let i = 0; i < nPostings; i++) {
            const p = await createRandomPosting(userId, groupId);
            postings.push(p);
        }

        const pg = new PostingsWithGroupInfo({groupInfo: gInfo, postings: postings});
        postingsByGroup.push(pg);
    }

    return {userId: userId, postingsByGroup: postingsByGroup};
}

/**
 *
 * @return {{postings: *[], groupId: string, userId: string}}
 */
function createGroupWithSomePostings() {
    xxxxx here //TODO:
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

async function deleteGroup(groupId) {
    await axios
        .delete(`/api/groups/${groupId}`)
        .then(response => {
            console.log(`Successfully deleted group [${groupId}]`);
            console.log(response)
        })
        .catch(error => {
            console.log(`Error while deleting group [${groupId}]`)
            console.log(error);
        });
}

async function deleteUser(userId) {
    await axios
        .delete(`/api/users/${userId}`)
        .then(response => {
            console.log(`Successfully deleted user [${userId}]`);
            console.log(response)
        })
        .catch(error => {
            console.log(`Error while deleting user [${userId}]`)
            console.log(error);
        });
}

async function deletePosting(postingId) {
    await axios
        .delete(`${POSTINGS_BASE_URL}/${postingId}`)
        .then(response => {
            console.log(`Successfully deleted posting [${postingId}]`);
            console.log(response)
        })
        .catch(error => {
            console.log(`Error while deleting posting [${postingId}]`)
            console.log(error);
        });
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
async function setupPosting() {
    let userId = await createRandomUser();
    let groupId = await createRandomGroup(userId);
    let posting = await createRandomPosting(userId, groupId);
    return {userId: userId, groupId: groupId, posting: posting};
}

/**
 * Deletes from the database the user, group and posting with the specified id.
 * Creator and group ids are passed because a posting is created along with a group and a user.
 * @param creatorId
 * @param groupId
 * @param postingId
 */
async function tearDownPosting(creatorId, groupId, postingId) {
    await tearDownPostings([creatorId], [groupId], [postingId]);
}

/**
 * Deletes from the database the provided postings, groups and users.
 * @param creatorIds
 * @param groupIds
 * @param postingIds
 */
async function tearDownPostings(creatorIds, groupIds, postingIds) {
    for (const pId of postingIds) {
        await deletePosting(pId);
    }

    for (const groupId of groupIds) {
        await deleteGroup(groupId);
    }

    for (const userId of creatorIds) {
        await deleteUser(userId);
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

