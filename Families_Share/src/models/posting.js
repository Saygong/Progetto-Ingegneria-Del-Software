const mongoose = require('mongoose')

const postingSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        group_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        photo: {
            type: Image,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        contact: Contact
    },
    { timestamps: true}
)

mongoose.pluralize(null)
const model = mongoose.model('Posting', postingSchema)

module.exports = model
