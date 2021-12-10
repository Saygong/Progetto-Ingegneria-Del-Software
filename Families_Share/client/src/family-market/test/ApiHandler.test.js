const ApiHandler = require("../src/api/ApiHandler");
const Posting = require("../src/api/model/Posting");
const PostingInfo = require("../src/api/model/PostingInfo");
const Contact = require("../src/api/model/Contact");
const GroupInfo = require("../src/api/model/GroupInfo");
const axios = require("axios");

const POSTINGS_BASE_URL = ApiHandler.POSTINGS_BASE_URL;


class PostingsWithGroupInfo {
    /**
     *
     * @param groupInfo {GroupInfo}
     * @param postings {Posting[]}
     */
    constructor({groupInfo, postings}) {
        this.groupInfo = groupInfo;
        this.postings = postings
    }
}


 class User {
     /**
      *
      * @param id {string}
      * @param token {string}
      */
     constructor(id, token) {
        this.id = id;
        this.token = token;
    }
 }

 
function getRandomString() {
    const randInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // 36 is the max number and 2 is the min because toString() accepts bases from 2 to 36
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
    const randomBase = randInt(2, 36);
    const randStr = (Math.random() + 1).toString(randomBase);
    const randLength = randInt(1, randStr.length);

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
 * Performs deep asserts on all the elements of the two lists.
 * @param actualList {Array}
 * @param expectedList {Array}
 */
function assertList(actualList, expectedList) {
    expect(actualList.length === expectedList.length).toBe(true);

    for (const actual of actualList) {
        const expected = expectedList.find(x => x.id === actual.id);

        expect(isNullOrUndefined(expected)).toBe(false);
        expect(actual).toEqual(expected);
    }
}


// TODO dato che assertTrue è sempre true, si può fare refactoring e generalizzare i metodi
//  oppure eliminarli del tutto ed usare expect().toEqual()
//  Io aspetterei di vedere se prima così runna i test e li passa
/**
 * Performs deep asserts for equality (default) or inequality of all properties
 * of the two provided PostingInfo objects
 * @param actual {Posting}
 * @param expected {Posting}
 * @param assertTrue {boolean} if false, the assert checks for inequality of all properties instead
 */
function strictAssertPosting(actual, expected, assertTrue=true) {
    expect(actual.id === expected.id).toBe(assertTrue);
    expect(actual.user_id === expected.user_id).toBe(assertTrue);
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


/**
 *
 * @return {Promise<User>}
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

    const userData = response.data;
    return new User(userData.id, userData.token);
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

    return new Posting(response.data);
}


/**
 *
 * @return {Promise<{groupId: string, postings: Posting[], user: User}>}
 */
async function createUserWithSomePostingsSameGroup() {
    const user = await createRandomUser();
    const groupInfo = await createRandomGroup(user.id);

    const postings = [];
    const nPostings = 5;
    for (let i = 0; i < nPostings; i++) {
        const p = await createRandomPosting(user.id, groupInfo.id);
        postings.push(p);
    }

    return {user: user, groupId: groupInfo.id, postings: postings};
}


/**
 *
 * @return {Promise<{postingsByGroup: PostingsWithGroupInfo[], user: User}>}
 */
async function createUserWithSomePostingsDifferentGroups() {
    const user = await createRandomUser();

    // For each group, create postings,
    // then create a PostingsWithGroupInfo object
    const nGroups = 3;
    const postingsByGroup = []
    for (let i = 0; i < nGroups; i++) {
        const gInfo = await createRandomGroup(user.id);

        const postings = [];
        const nPostings = 3;
        for (let i = 0; i < nPostings; i++) {
            const p = await createRandomPosting(user.id, gInfo.id);
            postings.push(p);
        }

        const pg = new PostingsWithGroupInfo({groupInfo: gInfo, postings: postings});
        postingsByGroup.push(pg);
    }

    return {user: user, postingsByGroup: postingsByGroup};
}


/**
 *
 * @return {Promise<{groupId: string, postings: Posting[], user: User}>}
 */
async function createGroupWithSomePostings() {
    return await createUserWithSomePostingsSameGroup();
}


/**
 *
 * @return {Promise<{groupIds: string[], user: User, favouritePostings: Posting[]}>}
 */
async function createUserWithSomeFavourites() {
    const {user, postingsByGroup} = await createUserWithSomePostingsDifferentGroups()

    const groupIds = [];
    const postings = [];
    for (const pg of postingsByGroup) {
        groupIds.push(pg.groupInfo.id);
        pg.postings.forEach(p => postings.push(p));
    }

    return {user: user, groupIds: groupIds, favouritePostings: postings};
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
 * and returns group id, user and the posting object.
 *
 * Both a user and group are created to simulate as accurately as possible a real user
 * situation, since a user must create a posting on a certain group.
 * To be even more realistic the user should belong to that group, but in this case
 * it's good enough.
 * @return {Promise<{groupId: GroupInfo, posting: Posting, user: User}>}
 */
async function setupPosting() {
    const user = await createRandomUser();
    const groupId = await createRandomGroup(user.id);
    const posting = await createRandomPosting(user.id, groupId);

    return {user: user, groupId: groupId, posting: posting};
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
    it('should return an array of all the postings of a group', async function () {
        // Arrange
        const setup = async () => {
            return await createGroupWithSomePostings();
        };

        const tearDown = async (userId, groupId, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], [groupId], postingIds);
        };

        const { user, groupId, postings } = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Act
        const actualPostings = await apiHandler.getGroupPostings(groupId);

        // Assert
        assertList(actualPostings, postings);

        // Teardown
        await tearDown(user.id, groupId, postings);
    });

    it('should return empty array when given a wrong id for a specific group', async function () {
        //Arrange
        const expectedLength = 0;
        const wrongId = "-1";
        const wrongToken = "-1";
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const actual = await apiHandler.getGroupPostings(wrongId);

        //Assert
        expect(actual.length === expectedLength).toBe(true);
    });
});


describe('Get group info', function () {
    it('should return the group info object given a specific group id', async function () {
        const setup = async () => {
            const user = await createRandomUser();
            const group = await createRandomGroup(user.id);

            return {user: user, group: group};
        };

        const tearDown = async (userId, groupId) => {
             await deleteGroup(groupId);
             await deleteUser(userId);
        };

        const { user, group } = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Act
        const actualGroup = await apiHandler.getGroupInfo(group.id);

        // Assert
        expect(group.id === actualGroup.id).toBe(true);
        expect(group.name === actualGroup.name).toBe(true);

        // Teardown
        await tearDown(user.id, group.id);
    });

    it('should return an empty group info object when given wrong arguments', async function () {
        //Arrange
        const expected = GroupInfo.EMPTY;
        const wrongId = "-1";
        const wrongToken = "-1"
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const actual = await apiHandler.getGroupInfo(wrongId);

        //Assert
        expect(actual).toEqual(expected);
    });
});


describe('Get group info of all user groups', function () {
    it('should return an array of the info objects of all the groups that the specified user belongs to ',
        async function () {
            const setup = async () => {
                const user = await createRandomUser();

                const groups = [];
                for (let i = 0; i < 5; i++) {
                    const g = await createRandomGroup(user.id);
                    groups.push(g);
                }

                return {user: user, groups: groups};
            };

            const tearDown = async (userId, groups) => {
                for (const g of groups) {
                    await deleteGroup(g.id);
                }

                await deleteUser(userId);
            };

            const { user, groups } = await setup();
            const apiHandler = new ApiHandler(user.token);

            // Act
            const actualGroups = await apiHandler.getUserGroups(user.id);

            // Assert
            assertList(actualGroups, groups);

            // Teardown
            await tearDown(user.id, group.id);
    });

    it('should return an empty array when given wrong arguments', async function () {
        //Arrange
        const wrongId = "-1";
        const wrongToken = "-1";
        const apiHandler = new ApiHandler(wrongToken);
        const expectedLength = 0;

        //Act
        const actual = await apiHandler.getUserGroups(wrongId);

        //Assert
        expect(actual.length === expectedLength).toBe(true);
    });
});


describe('Get single posting', function () {
    it('should return a single posting given a specific id', async function () {
        // Arrange
        const setup = async () => {
            return await setupPosting();
        };

        const tearDown = async (userId, groupId, postingId) => {
            return await tearDownPosting(userId, groupId, postingId);
        };

        const { user, groupId, expectedPosting } = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Act
        const actualPosting = await apiHandler.getPosting(expectedPosting.id);

        // Assert
        strictAssertPosting(actualPosting, expectedPosting);

        // Teardown
        await tearDown(user.id, groupId, expectedPosting.id);
    });

    it('should return an empty posting when given a wrong id for a specific posting', async function () {
        //Arrange
        const expected = Posting.EMPTY;
        const wrongId = "-1";
        const wrongToken = "-1"
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const actual = await apiHandler.getPosting(wrongId);

        //Assert
        strictAssertPosting(actual, expected);
    });
});


describe('Create posting', function () {
    it('should create a posting with the given information and return the created posting', async function () {
        // Arrange
        const setup = async () => {
            const user = await createRandomUser();
            const groupId = await createRandomGroup(user.id);

            return {user: user, groupId: groupId};
        };

        const tearDown = async (userId, groupId, postingId) => {
            await tearDownPosting(userId, groupId, postingId);
        };

        const { user, groupId } = setup();
        const apiHandler = new ApiHandler(user.token);
        const creationInfo = getRandomPostingInfo();

        // Act
        const createdPosting = await apiHandler.createPosting(user, groupId, creationInfo);

        // Assert
        // Deep equality check
        expect(createdPosting.group_id === groupId).toBe(true);
        strictAssertPostingInfo(creationInfo, createdPosting);

        // Teardown
        await tearDown(user.id, groupId, createdPosting.id);
    });

    it('should return and empty posting when invalid information is provided', async function () {
        //Arrange
        const expected = Posting.EMPTY;
        const wrongUserId = "-1";
        const wrongToken = ""
        const wrongGroupId = wrongUserId;
        const wrongCreationInfo = PostingInfo.EMPTY;
        wrongCreationInfo.name = "-1";
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const actual = await apiHandler.createPosting(wrongUserId, wrongGroupId, wrongCreationInfo);

        //Assert
        strictAssertPosting(actual, expected);
    });
});


describe('Edit posting', function () {
    it('should edit a posting with the given information and return the edited posting', async function () {
        // Arrange
        const setup = async () => {
            return await setupPosting();
        };

        const tearDown = async (userId, groupId, postingId) => {
            await tearDownPosting(userId, groupId, postingId);
        };

        const { user, groupId, postingToEdit } = setup();
        const apiHandler = new ApiHandler(user.token);

        const newInfo = new PostingInfo({
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
        const success = await apiHandler.editPosting(postingToEdit.id, newInfo);

        // Assert
        // Id has to be the same but the rest of the info was changed
        expect(success).toBe(true);

        // Teardown
        await tearDown(user.id, groupId, postingToEdit.id);
    });

    it('should return an empty posting when invalid information is provided', async function () {
        //Arrange
        const expected = Posting.EMPTY;
        const wrongUserId = "-1";
        const wrongToken = "-1"
        const wrongCreationInfo = PostingInfo.EMPTY;
        wrongCreationInfo.name = "-1"
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const actual = await apiHandler.editPosting(wrongUserId, wrongCreationInfo);

        //Assert
        expect(actual).toEqual(expected);
    });
});


describe('Delete posting', function () {
    it('should delete a posting given a specific id', async function () {
        // Arrange
        const setup = async () => {
            return await setupPosting();
        };

        // Need to make sure that the posting is deleted
        // since the api delete method is being tested
        const tearDown = async (userId, groupId, postingId) => {
            await tearDownPosting(userId, groupId, postingId);
        };

        const { user, groupId, postingToDelete } = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Act
        const isDeleted = await apiHandler.deletePosting(postingToDelete.id);

        // Assert
        expect(isDeleted).toBe(true);

        // Teardown
        await tearDown(user.id, groupId, postingToDelete.id);
    });

    it('should return false given a wrong id for a specific posting', async function () {
        //Arrange
        const wrongPostingId = "-1";
        const wrongToken = "-1";
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const isDeleted = await apiHandler.deletePosting(wrongPostingId);

        //Assert
        expect(isDeleted).toBe(false);
    });
});


describe('Get all user postings of a certain group', function () {
    it('should return a list of all the postings of a user in a specified group', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomePostingsSameGroup();
        };

        const tearDown = async (userId, groupId, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], [groupId], postingIds);
        };

        const {user, groupId, postings} = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Act
        const actualGroupPostings = await apiHandler.getUserPostings(user.id, groupId)

        // Assert
        assertList(actualGroupPostings, postings);

        // Teardown
        await tearDown(user.id, groupId, postings);
    });

    it('should return an empty array when given a wrong id for a specific user', async function () {
        //Arrange
        const wrongId = "-1";
        const wrongToken = "-1";
        const wrongGroupId = "-1";
        const apiHandler = new ApiHandler(wrongToken);
        const expectedLength = 0;

        //Act
        const actual = await apiHandler.getUserPostings(wrongId, wrongGroupId);

        //Assert
        expect(actual.length === expectedLength).toBe(true);
    });
});


describe('Get user favourite postings', function () {
    it('should return a list of all the postings marked as favourite by a specific user', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Act
        const actualPostings = await apiHandler.getUserFavouritePostings(user.id);

        // Assert
        assertList(actualPostings, favouritePostings);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);

    });

    it('should return an empty array when given a wrong id for a specific user', async function () {
        //Arrange
        const expectedLength = 0;
        const wrongId = "-1";
        const wrongToken = "-1";
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const actual = await apiHandler.getUserFavouritePostings(wrongId);

        //Assert
        expect(actual.length === expectedLength).toBe(true);
    });
});


describe('Edit user favourite postings', function () {
    it('should return true and the actual favourite postings should correspond to the updated ids',
        async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            postings.forEach(p => postingIds.push(p.id));

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Take only postings on odd indexes to make a different id list
        const newFavouritesIds = [];
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
        const success = await apiHandler.editUserFavourites(user.id, newFavouritesIds);
        const actualFavourites = await apiHandler.getUserFavouritePostings(user.id)

        // Assert
        // First check that the edit was successful
        expect(success).toBe(true);

        // Then check that the actual fetched postings ids correspond to the edited ids
        const actualIds = [];
        actualFavourites.forEach(fav => actualIds.push(fav.id));
        assertList(newFavouritesIds, actualIds);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);
    });

    it('should return false given a wrong id for a specific user', async function () {
        //Arrange
        const wrongId = "-1";
        const wrongToken = "-1";
        const newFavourites = []
        const apiHandler = new ApiHandler(wrongToken);

        //Act
        const success = await apiHandler.editUserFavourites(wrongId, newFavourites);

        //Assert
        expect(success).toBe(false);
    });
});


describe("Check if a single posting belongs to a user's favourites list", function () {
    it('should return true if a posting is a user favourite', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);

        // this is already a favourite, so the tested method should return true
        const toCheck = favouritePostings[0];

        // Act
        const isFavourite = await apiHandler.isUserFavourite(user.id, toCheck.id);

        // Assert
        expect(isFavourite).toBe(true);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);
    });

    it('should return false if a posting is not a user favourite', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);

        // Act
        const wrongId = "-1";
        const isFavourite = await apiHandler.isUserFavourite(user.id, wrongId);

        // Assert
        expect(isFavourite).toBe(false);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);
    });
});


describe("Add a single posting to a user's favourites list", function () {
    it('should return true if an existing posting is added to the favourites list', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);
        const toAdd = await createRandomPosting(user.id, groupIds[0]);

        // Act
        const success = apiHandler.addUserFavourite(user.id, toAdd.id);

        // Assert
        expect(success).toBe(true);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);
    });

    it('should return false if the posting to be added is already a favourite', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);
        const alreadyAdded = favouritePostings[0]

        // Act
        const success = apiHandler.addUserFavourite(user.id, alreadyAdded.id);

        // Assert
        expect(success).toBe(false);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);
    });
});


describe("Remove a single posting from a user's favourites list", function () {
    it('should return true if a favourite posting is removed from the list', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);
        const toRemove = await createRandomPosting(user.id, groupIds[0]);

        // Act
        const success = apiHandler.removeUserFavourite(user.id, toRemove.id);

        // Assert
        expect(success).toBe(true);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);
    });

    it('should return false if the posting to be removed is not a favourite', async function () {
        // Arrange
        const setup = async () => {
            return await createUserWithSomeFavourites();
        };

        const tearDown = async (userId, groupIds, postings) => {
            const postingIds = [];
            for (const p of postings) {
                postingIds.push(p.id);
            }

            await tearDownPostings([userId], groupIds, postingIds);
        };

        const {user, groupIds, favouritePostings} = await setup();
        const apiHandler = new ApiHandler(user.token);
        const wrongIdToRemove = "-1";

        // Act
        const success = apiHandler.removeUserFavourite(user.id, wrongIdToRemove);

        // Assert
        expect(success).toBe(false);

        // Teardown
        await tearDown(user.id, groupIds, favouritePostings);
    });
});
