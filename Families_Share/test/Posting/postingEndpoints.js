const User = require("../../src/models/user");
const Group = require("../../src/models/group");

/* ---------------------------------------     FAMILY - MARKET  TEST    --------------------------------------------- */

describe('/Get/api/groups/groupId/postings', () => {
    it('it should correctly return a list of postings contained in a group', (done) => {
        Group.find({ name: 'Test Group 2' }, (err, group) => {
            chai.request(server)
                .get(`/api/groups/${group.group_id}/postings`)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
})

describe('/Get/api/users/userId/favourites', () => {
    it('it should correctly return a list of favourite postings of a user', (done) => {
        User.find({ email: 'test3@email.com' }, (user) => {
            chai.request(server)
                .get(`/api/users/${user.user_id}/favourites`)
                .end((res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
})

describe('/Get/api/users/userId/groups/groupId/postings', () => {
    it('it should correctly return a list of postings of a user on a group', (done) => {
        User.find({ email: 'test3@email.com' }, (user) => {
            Group.findOne({ name: 'Test Group 2' }, (group) => {
                chai.request(server)
                    .get(`/api/users/${user.userId}/groups/${group.groupId}/postings`)
                    .end((res) => {
                        res.should.have.status(404)
                        done()
                    })
            })
        })
    })
})

describe('/Patch/api/users/userId', () => {
    it('it should patch a users saved posting', (done) => {
        User.findOne({ email: 'test3@email.com' }, (user) => {
            chai.request(server)
                .patch(`/api/users/${user.user_id}`)
                .set('Authorization', user.token)
                .end((res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })
})
// Qui verranno aggiunti  i test che riguardano il corretto funzionamento della classe Posting
