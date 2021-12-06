const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    contact_id: {
      type: String,
      unique: true,
      required: true
    },
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
    }
  },
  { timestamps: true }
)

mongoose.pluralize(null)
const model = mongoose.model('Contact', contactSchema)

module.exports = model
