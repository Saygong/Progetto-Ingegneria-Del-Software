const common = require('./common')

const { chai } = common
const { server } = common

const Profile = require('../src/models/profile')
const Address = require('../src/models/address')
const Image = require('../src/models/image')
const User = require('../src/models/user')
const Rating = require('../src/models/rating')
const Device = require('../src/models/device')
const Group = require('../src/models/group')
const Group_Settings = require('../src/models/group-settings')
const Password_Reset = require('../src/models/password-reset')
const Member = require('../src/models/member')
const Notification = require('../src/models/notification')
const Parent = require('../src/models/parent')
const Child = require('../src/models/child')
const Activity = require('../src/models/activity')
const Announcement = require('../src/models/announcement')
const Reply = require('../src/models/reply')
const Posting = require('../src/models/family-market/posting')
const Contact = require('../src/models/family-market/contact')

const importTest = (name, path) => {
  describe(name, () => {
    require(path)
  })
}

const initializeDB = async () => {
  const user2 = {
    given_name: 'Test',
    family_name: 'User2',
    number: '0123546879',
    email: 'test2@email.com',
    password: 'password',
    visible: true,
    language: 'en',
    favourites: ['io', 'sto', 'bene']
  }
  const user3 = {
    given_name: 'Test',
    family_name: 'User3',
    number: '0123546879',
    email: 'test3@email.com',
    password: 'password',
    visible: true,
    language: 'en',
    favourites: ['ciao', 'come', 'stai']
  }

  await chai.request(server).post('/api/users').send(user2)
  await chai.request(server).post('/api/users').send(user3)

  const user = await User.findOne({email: 'test3@email.com'});
  const group2 = {
    name: 'Test Group 2',
    description: 'Also awesome group',
    visible: true,
    location: 'Kuala lumpur',
    owner_id: user.user_id,
    invite_ids: [],
    contact_type: 'email',
    contact_info: 'yolo@email.com'
  }
  const group3 = {
    name: 'Test Group 3',
    description: 'Again an awesome group',
    visible: true,
    location: 'Kuala lumpur',
    owner_id: user.user_id,
    invite_ids: [],
    contact_type: 'phone',
    contact_info: '65485748'
  }

  await chai.request(server).post('/api/groups').send(group2).set('Authorization', user.token)
  await chai.request(server).post('/api/groups').send(group3).set('Authorization', user.token)
  const group = await Group.findOne({ name: 'Test Group 2' })

  const activity = {
    group_id: group.group_id,
    creator_id: user.user_id,
    name: 'Test Activity 2',
    color: '#00838F',
    description: 'test',
    location: 'Kuala lumpur',
    repetition: true,
    repetition_type: 'weekly',
    different_timeslots: false
  }

  // Creation of two instances of posting
  const posting1 = {
    user_id: user.user_id,
    group_id: group.group_id,
    name: 'Lego BrickHeadz',
    category: 'Toys Construction',
    description: 'Giving away',
    photo: '/images/profiles/posting_default_photo.png',
    type: 'Lend',
    contact: {
      email: '880141@stud.unive.com',
      place: 'Chirignago',
      phone_number: '3406862134'
    }
  }
  const posting2 = {
    user_id: user.user_id,
    group_id: group.group_id,
    name: 'Barbie Fairy',
    category: 'Donation',
    description: 'Please help me get rid',
    photo: '/images/profiles/posting_default_photo.png',
    type: 'Donation',
    contact: {
      email: 'marcodifresco99@gmail.com',
      place: 'Chiry',
      phone_number: '3477808876'
    }
  }

  // Adding posting1 & posting2 to database
  await chai.request(server).post(`/api/family-market/postings`)
      .send(posting1)
      .set('Authorization', user.token)

  await chai.request(server).post(`/api/family-market/postings`)
      .send(posting2)
      .set('Authorization', user.token)

  // Add postings to favourites of user and user4
  const user4 = {
    given_name: 'Test',
    family_name: 'User3',
    number: '0123546879',
    email: 'test4@email.com',
    password: 'password',
    visible: true,
    language: 'en',
    favourites: ['ciao', 'come', 'stai']
  }
  await chai.request(server).post('/api/users').send(user4)
  const myUser = await User.findOne({email: 'test4@email.com'}).lean().exec()

  const fav1 = await Posting.findOne({ name: 'Lego BrickHeadz' });
  const fav2 = await Posting.findOne({ name: 'Barbie Fairy' });

  await chai.request(server).patch(`/api/family-market/users/${myUser.user_id}/favourites`)
      .send({
        favourites: [fav1.id, fav2.id]
      })
      .set('Authorization', myUser.token);

  await chai.request(server).patch(`/api/family-market/users/${user.user_id}/favourites`)
      .send({
        favourites: [fav1.id, fav2.id]
      })
      .set('Authorization', user.token);

  const events = [
    {
      description: 'Test timeslot',
      location: 'Kuala lumpur',
      summary: 'Test timeslot',
      start: {
        dateTime: '2019-03-06T22:00:00.000Z',
        date: null
      },
      end: {
        dateTime: '2019-03-06T23:00:00.000Z',
        date: null
      },
      extendedProperties: {
        shared: {
          requiredParents: 4,
          requiredChildren: 10,
          cost: 10,
          parents: JSON.stringify([]),
          children: JSON.stringify([]),
          status: 'ongoing',
          activityColor: '#00838F',
          groupId: group.group_id,
          repetition: 'weekly'
        }
      }
    },
    {
      description: 'Test timeslot',
      location: 'Kuala lumpur',
      summary: 'Test timeslot',
      start: {
        dateTime: '2019-03-13T22:00:00.000Z',
        date: null
      },
      end: {
        dateTime: '2019-03-13T23:00:00.000Z',
        date: null
      },
      extendedProperties: {
        shared: {
          requiredParents: 4,
          requiredChildren: 10,
          cost: 10,
          parents: JSON.stringify([]),
          children: JSON.stringify([]),
          status: 'ongoing',
          activityColor: '#00838F',
          groupId: group.group_id,
          repetition: 'weekly'
        }
      }
    },
    {
      description: 'Test timeslot',
      location: 'Kuala lumpur',
      summary: 'Test timeslot',
      start: {
        dateTime: '2019-03-20T22:00:00.000Z',
        date: null
      },
      end: {
        dateTime: '2019-03-20T23:00:00.000Z',
        date: null
      },
      extendedProperties: {
        shared: {
          requiredParents: 4,
          requiredChildren: 10,
          cost: 10,
          parents: JSON.stringify([]),
          children: JSON.stringify([]),
          status: 'ongoing',
          activityColor: '#00838F',
          groupId: group.group_id,
          repetition: 'weekly'
        }
      }
    },
    {
      description: 'Test timeslot',
      location: 'Kuala lumpur',
      summary: 'Test timeslot',
      start: {
        dateTime: '2019-03-27T22:00:00.000Z',
        date: null
      },
      end: {
        dateTime: '2019-03-27T23:00:00.000Z',
        date: null
      },
      extendedProperties: {
        shared: {
          requiredParents: 4,
          requiredChildren: 10,
          cost: 10,
          parents: JSON.stringify([]),
          children: JSON.stringify([]),
          status: 'ongoing',
          activityColor: '#00838F',
          groupId: group.group_id,
          repetition: 'weekly'
        }
      }
    }
  ]
  await chai.request(server).post(`/api/groups/${group.group_id}/activities`).send({ activity, events }).set('Authorization', user.token)
  const announcement = {
    message: 'Test Announcement 2'
  }
  await chai.request(server).post(`/api/groups/${group.group_id}/announcements`).send(announcement).set('Authorization', user.token)
  const child = {
    given_name: 'Test',
    family_name: 'Child',
    gender: 'girl',
    birthdate: new Date(),
    allergies: 'allergic to peanuts',
    special_needs: 'no',
    other_info: 'no',
    background: '#00838F',
    image: '/images/profiles/child_default_photo.jpg'
  }
  await chai.request(server).post(`/api/users/${user.user_id}/children`).send(child).set('Authorization', user.token)
}
describe('Test', () => {
  // Init Database
  before(async () => {
    await initializeDB()
  })

  importTest('[family-market] User Endpoints Test', './Users/userEndpoints')
  importTest('[family-market] Group Endpoints Test', './Groups/groupEndpoints')
  importTest('Users Groups Endpoints Test', './Users/groupEndpoints')
  importTest('Users Profile Endpoints Test', './Users/profileEndpoints')
  importTest('Users Children Endpoints Test', './Users/childrenEndpoints')
  importTest('Group Members Endpoints Test', './Groups/memberEndpoints')
  importTest('Group Various Endpoints Test', './Groups/variousEndpoints')
  importTest('Group Various Endpoints Test', './Groups/activityEndpoints')
  importTest('Group Announcement Endpoints Test', './Groups/announcementEndpoints')
  importTest('User Various Endpoints Test', './Users/variousEndpoints')
  importTest('Child Endpoints Test', './Children/childEndpoints')
  importTest('Profile Endpoints Test', './Profiles/profileEndpoints')
  importTest('Community Endpoints Test', './Community/communityEndpoints')
  importTest(' [family-market] Posting Endpoints Test', './Posting/postingEndpoints')

  // Cleanup
  after(async () => {
    await User.deleteMany({})
    await Profile.deleteMany({})
    await Image.deleteMany({})
    await Rating.deleteMany({})
    await Address.deleteMany({})
    await Device.deleteMany({})
    await Password_Reset.deleteMany({})
    await Group.deleteMany({})
    await Group_Settings.deleteMany({})
    await Member.deleteMany({})
    await Notification.deleteMany({})
    await Parent.deleteMany({})
    await Child.deleteMany({})
    await Activity.deleteMany({})
    await Reply.deleteMany({})
    await Announcement.deleteMany({})
    await Posting.deleteMany({})
    await Contact.deleteMany({})
  })
})
