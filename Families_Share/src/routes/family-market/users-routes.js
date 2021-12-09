const express = require('express')
const router = new express.Router()
const User = require('../../models/user')
const Posting = require('../../models/family-market/posting')
const Member = require('../../models/member')

/* ----------------------------------------     FAMILY-MARKET    ---------------------------------------------------- */

// Prefix: “/api/family-market/users“
// Route for getUserFavouritePostings to show all the saved postings of an user
router.get('/:userId/favourites', async (req, res) => {
  // Check if user is not authenticated
  if (!req.params.userId) {
    return res.status(401).send('Not authenticated')
  }
  const u_id = req.params.userId

  try {
    // Query that retrieves all the saved postings of the user user_id = u_id
    const favouriteListId = await User.findOne({ user_id: `${u_id}` }, 'favourites').exec()

    let fav_post = []

    // Multiple queries to insert the favourites posts into a list
    for (let post of favouriteListId) {
      fav_post.push(await Posting.findOne({ id: `${post.id}` }).lean().exec())
    }

    if (fav_post.length === 0) {
      return res.status(404).send('This user has no saved postings')
    }
    res.json(fav_post)
  } catch (error) {
    return res.status(401).send('Error')
  }
})

// Prefisso: “/api/family-market/users“
// Route for getUserPosting to show all the postings from a group of a user
router.get('/:userId/groups/:groupId/postings', async (req, res) => {
  // Check user's integrity
  if (req.user_id !== req.params.id) { return res.status(401).send('Unauthorized') }
  const g_id = req.params.groupId
  const u_id = req.params.userId

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

    // Query that retrieves all postings with group_id = g_id of the user user_id = u_id
    return Posting.find({
      user_id: `${u_id}`,
      group_id: `${g_id}`
    })
      .sort({ creation_date: 'desc' })
      .lean()
      .exec()
      .then(postings => {
        if (postings.length === 0) {
          return res.status(404).send('This user has no posting in this group')
        }
        res.json(postings)
      })
  } catch (error) {
    return res.status(401).send('Error')
  }
})

// Prefisso: “/api/family-market/users”
// Route for editUserFavourites edit the list of saved postings of the user -> Unlike PUT, PATCH applies a partial update to the resource.
router.patch('/:userId/favourites', async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user_id) {
    return res.status(401).send('Not authenticated')
  }
  const u_id = req.params.userId

  try {
    // req.patch must be the updated favourites postings list
    await User.findOneAndUpdate({ user_id: `${u_id}` }, req.patch).then(
      res.status(204).send('Favourites successfully updated')
    )
  } catch (error) {
    next(error)
  }
})

module.exports = router
