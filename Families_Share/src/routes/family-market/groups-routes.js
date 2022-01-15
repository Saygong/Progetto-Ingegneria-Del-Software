const Member = require('../../models/member')
const Posting = require('../../models/family-market/posting')
const express = require('express')
const router = new express.Router()
/* ----------------------------------------     FAMILY-MARKET    ---------------------------------------------------- */

// Prefix: “/api/family-market/groups”
// Route for getGroupPostings in order to show all the postings in a group
router.get('/:groupId/postings', async (req, res) => {
  // Check if user is not authenticated
  if (!req.user_id) {
    res.status(401).send('Not authenticated')
  }
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
      res.status(401).send('Unauthorized')
    }

    // Query that retrieves all postings with group_id = g_id
    await Posting.find({
      group_id: `${g_id}`
    })
      .sort({ creation_date: 'desc'})
      .lean()
      .exec()
      .then(postings => {
        res.json(postings)
      })
  } catch (error) {
    res.status(401).send('Error')
  }
})

module.exports = router
