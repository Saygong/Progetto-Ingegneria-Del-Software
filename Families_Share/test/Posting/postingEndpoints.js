const User = require('../../src/models/user')
const Group = require('../../src/models/group')
const Posting = require('../../src/models/family-market/posting')



describe('[family-market] /Get/api/family-market/postings/postingId', () => {
  it('it should correctly return the postings with the specified id', (done) => {
    Group.findOne({ name: 'Test Group 2' }, (err, group) => {
      Posting.findOne({ group_id: group.group_id }, (err, posting) => {
        User.findOne({user_id: posting.user_id}, (err, user) => {
          chai.request(server)
              .get(`/api/family-market/postings/${posting.id}`)
              .set('Authorization', user.token)
              .end((err, res) => {

                console.log("Err: " + err);
                console.log("Response text: " + res.text)
                console.log("Response body: " + JSON.stringify(res.body))

                res.should.have.status(200)
                res.body.should.have.property('id')
                res.body.should.have.property('user_id')
                res.body.should.have.property('group_id')
                res.body.should.have.property('name')
                res.body.should.have.property('category')
                res.body.should.have.property('description')
                res.body.should.have.property('photo')
                res.body.should.have.property('type')
                res.body.should.have.property('contact')
                const contact = res.body.contact;
                contact.should.have.property('email');
                contact.should.have.property('place');
                contact.should.have.property('phone_number');

                done()
        })
      })
      })
    })
  })
})

describe('[family-market] /Patch/api/family-market/postings/postingId', () => {
  it('it should correctly return "Posting successfully updated"', async () => {
    const postingGroup = await Group.findOne({ name: 'Test Group 2' })
    const postingCreator = await User.findOne({ email: 'test3@email.com' })
    const patch = {
      user_id: postingCreator.user_id,
      group_id: postingGroup.group_id,
      name: 'Lego',
      category: 'Toys',
      description: 'Bla bLa xd',
      photo: '/images/profiles/posting_default_photo.png',
      type: 'Lend',
      email: '880141@stud.unive.com',
      place: 'Chirignago',
      phone_number: '3406862134'
    }

    const group = await Group.findOne({ name: 'Test Group 2' });
    const posting = await Posting.findOne({
      group_id: group.group_id,
      user_id: postingCreator.user_id
    })

    const res = await chai.request(server)
        .patch(`/api/family-market/postings/${posting.id}`)
        .send(patch).set('Authorization', postingCreator.token)

    res.should.have.status(200);
  })
})

describe('[family-market] /Delete/api/family-market/postings/postingId', () => {
  it('it should correctly return "Posting successfully deleted"', (done) => {
    Group.findOne({name: 'Test Group 2'}, (err, group) => {

      Posting.findOne({group_id: group.group_id}, (err, posting) => {
        User.findOne({user_id: posting.user_id}, (err, user) => {
          chai.request(server)
              .delete(`/api/family-market/postings/${posting.id}`)
              .set('Authorization', user.token)
              .end((err, res) => {

                res.should.have.status(200)
                done()
              })
        })
      })
    })
  })
})

describe('[family-market] /Post/api/family-market/postings/', () => {
  it('it should correctly return the created posting', async () => {
    const existingGroup = await Group.findOne({ name: 'Test Group 2' })
    const existingCreator = await User.findOne({ email: 'test3@email.com' })
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
    };

    const res = await chai.request(server)
      .post(`/api/family-market/postings`)
      .send(posting)
      .end((res) => {
        res.should.have.status(404)
        done()
      })
  })
})