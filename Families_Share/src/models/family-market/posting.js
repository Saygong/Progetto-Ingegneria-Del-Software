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
    contact_id: {
      type: String,
      required: true
    },
    creation_date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
)

postingSchema.virtual('contact', {
  ref: 'Contact',
  localField: 'contact_id',
  foreignField: 'contact_id',
  justOne: true
})

mongoose.pluralize(null)
const model = mongoose.model('Posting', postingSchema)

module.exports = model
