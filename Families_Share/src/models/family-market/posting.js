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
    // Base64 string that represents an image
    photo: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    contact: {
      email: {
          type: String,
          required: true
      },
      place: {
          type: String,
          required: true
      },
      phone_number: {
          type: String,
          required: true
      },
    },
    creation_date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
)


mongoose.pluralize(null)
const model = mongoose.model('Posting', postingSchema)

module.exports = model
