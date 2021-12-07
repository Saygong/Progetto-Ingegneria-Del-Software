const express = require('express')
const router = new express.Router()

const Posting = require('../models/family-market/posting')
const Member = require('../models/member')
const objectid = require('objectid')

// TODO: FORSE NON SERVE perche alla fine quando facciamo richiesta per i post di un gruppo, li abbiamo gia. dice pier
// Prefisso: “/api/groups/:groupId/postings”
// Route for getPosting that retrieve a posting
router.get('/:postingId', async (req, res) => {
  // Check if user is not authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }
  const p_id = req.params.postingId
  const g_id = req.params.groupId
  const u_id = req.user_id

  // Check if user is member of the group
  try {
    const member = await Member.findOne({
      group_id: `${g_id}`,
      user_id: `${u_id}`,
      group_accepted: true,
      user_accepted: true
    })
    if (!member) {
      return res.status(401).send('Unauthorized')
    }

    // Query that retrieves the posting with id = p_id
    return Posting.findOne({
      id: `${p_id}`
    })
      .lean()
      .exec()
      .then(posting => {
        if (posting.length === 0) {
          return res.status(404).send('This posting does not exist')
        }
        res.json(posting)
      })
  } catch (error) {
    return res.status(401).send('Error')
  }
})

// Prefisso: “/api/groups/:groupId/postings”
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
      res.status(200).send('Posting successfully updated')
    )

  } catch (error) {
    next(error)
  }
})

// Prefisso: “/api/groups/:groupId/postings”
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

// Prefisso: “/api/groups/:groupId/postings”
// Route for createPosting -> create a new posting
router.post('/newPost', async (req, res, next) => {
  const {
    user_id, group_id, name, category, description, photo, type, contact_id
  } = req.body
  if (!(user_id && group_id && name && category && description && photo && type && contact_id)) {
    return res.status(400).send('Bad Request')
  }
  try {
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
      contact_id
    }
    await Posting.create(newPosting)
    const response = {
      name,
      category,
      description,
      photo,
      type
      // TODO contact
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
