const express = require('express')
const router = new express.Router()
const Posting = require('../../models/family-market/posting')
const Member = require('../../models/member')
const objectid = require('objectid')
const Group = require("../../models/group");
const Profile = require("../../models/profile");
const User = require("../../models/user");
const Device = require("../../models/device");
const Notification = require("../../models/notification");
const nh = require('../../helper-functions/notification-helpers')
const texts = require("../../constants/notification-texts");

// Prefisso: “/api/family-market/postings”
// Route for getPosting that retrieve a posting
router.get('/:postingId', async (req, res) => {
  // Check if user is not authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }

  try {
    const p_id = req.params.postingId
    // Query that retrieves the posting with id = p_id
    return Posting.findOne({
      id: `${p_id}`
    })
      .lean()
      .exec()
      .then(async posting => {
        if (!posting) {
          return res.status(404).send('This posting does not exist')
        }

        // Check if user is member of the group
        const g_id = posting.group_id
        const u_id = req.user_id

        const member = await Member.findOne({
          group_id: `${g_id}`,
          user_id: `${u_id}`,
          group_accepted: true,
          user_accepted: true
        })
        if (!member) {
          return res.status(401).send('Unauthorized')
        }

        res.json(posting)
      })
  } catch (error) {
    return res.status(401).send('Error')
  }
})

// Prefisso: “/api/family-market/postings”
// Route for editPosting  ->  edit an existing posting
router.patch('/:postingId', async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }
  const p_id = req.params.postingId

  try {
    // Check owner consistency
    const {user_id} = await Posting.findOne({ id: p_id }, 'user_id')

    if (req.user_id !== user_id)
    {
      return res.status(401).send('Unauthorized')
    }

    // req.body must be an object with the updated field
    const update = {...req.body}

    await Posting.updateOne({ id: p_id}, update)

    res.status(200).send('Posting successfully updated')

  } catch (error) {
    next(error)
  }
})

// Prefisso: “/api/family-market/postings”
// Route for deletePosting -> delete an existing posting
router.delete('/:postingId', async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }
  const p_id = req.params.postingId
  try {
    // Check owner consistency
    let {user_id} = await Posting.findOne({ id: `${p_id}` }, 'user_id')
    if (req.user_id !== user_id) { return res.status(401).send('Unauthorized') }

    await Posting.deleteOne({ id: `${p_id}` }).then(
      res.status(200).send('Posting successfully deleted')
    )

  } catch (error) {
    next(error)
  }
})


async function sendNewPostingNotifications(group_id, user_id) {
  const new_posting_creator = await Profile.findOne({ user_id })
  const current_group = await Group.findOne({ group_id })

  const to_members = await Member.find({ group_id, user_id: { $ne: user_id },
    group_accepted: true, user_accepted: true }).distinct('user_id')
  const to_users = await User.find({ user_id: { $in: to_members } })

  const devices = await Device.find({ user_id: { $in: to_members } })

  // type e code are the name and index of the object
  // that contains the notification text
  const notificationType = "familyMarket"
  const notificationCode = 0
  if (new_posting_creator && current_group) {
    const notifications = []
    to_members.forEach(member => {
      notifications.push({
        owner_type: 'user',
        owner_id: member,
        // Notification text comes from getNotificationDescription in notification-helpers,
        // Also, look at line 666 of src/routes/group-routes:
        // that's the function where notifications for the group are fetched.
        // Go there to see how notifications are handled in the app.
        // "type" and "code" are used to fetch the header and description
        //  from notification-texts.js.
        type: notificationType,
        code: notificationCode,
        read: false,
        subject: `${new_posting_creator.given_name} ${new_posting_creator.family_name}`,
        object: `${current_group.name}`
      })
    })
    await Notification.create(notifications)

    const messages = []
    devices.forEach(device => {
      const language = to_users.filter(user => user.user_id === device.user_id)[0].language

      const notificationTexts = texts[language][notificationType][notificationCode]
      messages.push({
        to: device.device_id,
        sound: 'default',
        title: notificationTexts.header,
        body: `${new_posting_creator.given_name} ${new_posting_creator.family_name} ${notificationTexts.description} ${current_group.name}`,
        data: { url: `${process.env.CITYLAB_URI}/groups/${group_id}/activities` }
      })
    })
    await nh.sendPushNotifications(messages)
  }
}


// Prefisso: “/api/family-market/postings”
// Route for createPosting -> create a new posting
router.post('/', async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }

  const {
    user_id, group_id, name, category, description, photo, type, contact
  } = req.body

  if (!(user_id && group_id && name && category && description && photo && type
      && contact.email && contact.place && contact.phone_number)) {
    return res.status(400).send('Some fields are missing!')
  }

  try {
    // Check if user is member of the group
    const member = await Member.findOne({
      group_id: `${group_id}`,
      user_id: `${user_id}`,
      group_accepted: true,
      user_accepted: true
    })
    if (!member) {
      return res.status(401).send('The user is not a member of the group')
    }

    const id = objectid()

    const newPosting = {
      id,
      user_id,
      group_id,
      name,
      category,
      description,
      photo,
      type,
      contact
    }

    await Posting.create(newPosting)

    const response = {
      id: id,
      user_id: user_id,
      group_id: group_id,
      name: name,
      category: category,
      description: description,
      photo: photo,
      type: type,
      contact: contact
    }

    res.json(response)

    await sendNewPostingNotifications(group_id, user_id)

  } catch (err) {
    return res.status(401).send("Caught Error:" + JSON.stringify(err));
  }
})
module.exports = router
