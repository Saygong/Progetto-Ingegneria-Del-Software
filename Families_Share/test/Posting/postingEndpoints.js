const User = require("../../src/models/user");
const Group = require("../../src/models/group");
const Posting = require("../../src/models/family-market/posting");

/* ---------------------------------------     FAMILY - MARKET  TEST    --------------------------------------------- */
describe('/Get/api/family-market/postings/postingId', () => {
    it('it should correctly return the postings with the specified id', async (done) => {
        Group.findOne({ name: 'Test Group 2' }, (group) => {
            Posting.findOne({group_id: group.group_id}, (posting) => {
                chai.request(server)
                    .get(`/api/family-market/postings/${posting.id}`)
                    .end((res) => {
                        res.should.have.status(404)
                        done()
                    })
            })
        })
    })
})

describe('/Patch/api/family-market/postings/postingId', () => {
    it('it should correctly return "Posting successfully updated"', async (done) => {
        const postingGroup = await Group.findOne({name: 'Test Group 2'})
        const postingCreator = await User.findOne({ email: 'test3@email.com' })
        const patch = {
            user_id: postingCreator.user_id,
            group_id: postingGroup.group_id,
            name: 'Lego',
            category: 'Toys',
            description: 'Bla bLa',
            photo: '/images/profiles/posting_default_photo.png',
            type: 'Lend',
            email: '880141@stud.unive.com',
            place: 'Chirignago',
            phone_number: '3406862134'
        }
        Group.findOne({name: 'Test Group 2'}, (group) => {
            Posting.findOne({group_id: group.group_id}, (posting) => {
                chai.request(server)
                    .patch(`/api/family-market/postings/${posting.id}`)
                    .send(patch)
                    .end((res) => {
                        res.should.have.status(404)
                        done()
                    })
            })
        })
    })
})

describe('/Delete/api/family-market/postings/postingId', () => {
    it('it should correctly return "Posting successfully deleted"', (done) => {
        Group.findOne({ name: 'Test Group 2' }, (group) => {
            Posting.findOne({group_id: group.group_id}, (posting) => {
                chai.request(server)
                    .delete(`/api/family-market/postings/${posting.id}`)
                    .end((res) => {
                        res.should.have.status(404)
                        done()
                    })
            })
        })
    })
})

describe('/Post/api/family-market/postings/', () => {
    it('it should correctly return the created posting', async (done) => {
        const existingGroup = await Group.findOne({name: 'Test Group 2'})
        const existingCreator = await User.findOne({email: 'test3@email.com'})
        const posting = {
            user_id: existingCreator.user_id,
            group_id: existingGroup.group_id,
            name: 'Pokemon',
            category: 'Trading card',
            description: 'too much volcano',
            photo: '/images/profiles/posting_default_photo.png',
            type: 'Lend',
            email: '880141@stud.unive.com',
            place: 'Chirignago',
            phone_number: '3406862134'
        }
        chai.request(server)
            .post(`/api/family-market/postings`)
            .send(posting)
            .end((res) => {
                res.should.have.status(404)
                done()
            })
    })
})