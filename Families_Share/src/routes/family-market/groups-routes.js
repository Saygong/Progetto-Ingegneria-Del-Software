const Member = require("../models/member");
const Posting = require("../models/family-market/posting");

/* ----------------------------------------     FAMILY-MARKET    ---------------------------------------------------- */

// Prefisso: “/api/family-market/groups”
// Route for getGroupPostings in order to show all the postings in a group
router.get('/:groupId/postings', async (req, res) => {
    // Check if user is not authenticated
    if (!req.user_id) {
        return res.status(401).send('Not authenticated')
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
            return res.status(401).send('Unauthorized')
        }

        // Query that retrieves all postings with group_id = g_id
        return Posting.find({
            group_id: `${g_id}`
        })
            .sort({ creation_date: 'desc' })
            .lean()
            .exec()
            .then(postings => {
                if (postings.length === 0) {
                    return res.status(404).send('Group has no postings')
                }
                res.json(postings)
            })
    } catch (error) {
        return res.status(401).send('Error')
    }
})

module.exports = router