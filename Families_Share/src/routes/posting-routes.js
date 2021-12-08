const express = require('express')
const router = new express.Router()

const Posting = require('../models/family-market/posting')
const Member = require('../models/member')
const objectid = require('objectid')
const Contact = require("../models/family-market/contact");

// Prefisso: “/api/postings”
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

// Prefisso: “/api/postings”
// Route for editPosting  ->  edit an existing posting
router.patch('/:postingId', async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }
  const p_id = req.params.postingId
  try {
    // Check owner consistency
    let post_owner = await Posting.findOne({ id: `${p_id}` }, 'user_id')
    if (req.user_id !== post_owner) { return res.status(401).send('Unauthorized') }

    // req.patch must be an object with the updated field
    await Posting.findOneAndUpdate({ id: `${p_id}` }, req.patch).then(
      res.status(204).send('Posting successfully updated')
    )

  } catch (error) {
    next(error)
  }
})

// Prefisso: “/api/postings”
// Route for deletePosting -> delete an existing posting
router.delete('/:postingId', async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }
  const p_id = req.params.postingId
  try {
    // Check owner consistency
    let post_owner = await Posting.findOne({ id: `${p_id}` }, 'user_id')
    if (req.user_id !== post_owner) { return res.status(401).send('Unauthorized') }

    await Posting.deleteOne({ id: `${p_id}` }).then(
      res.status(200).send('Posting successfully deleted')
    )

  } catch (error) {
    next(error)
  }
})

// Prefisso: “/api/postings”
// Route for createPosting -> create a new posting
router.post('/', async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }

  const {
    user_id, group_id, name, category, description, photo, type, email, place, phone_number
  } = req.body

  if (!(user_id && group_id && name && category && description && photo && type && email && place && phone_number)) {
    return res.status(400).send('Bad Request')
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
      return res.status(401).send('Unauthorized')
    }

    const id = objectid()
    const contact_id = objectid()
    const newPosting = {
      id,
      user_id,
      group_id,
      name,
      category,
      description,
      photo,
      type,
      contact_id
      //creation_date fatto in automatico? Date.now() //se va male prendo l'esempio dell'indiano
    }
    const newContact = {
      contact_id,
      email,
      place,
      phone_number
    }
    await Posting.create(newPosting)
    await Contact.create(newPosting)
    const response = {
      id: id,
      user_id: user_id,
      group_id: group_id,
      name: name,
      category: category,
      description: description,
      photo: photo,
      type: type,
      contact: {
        email: email,
        place: place,
        phone_number: phone_number
      }
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
