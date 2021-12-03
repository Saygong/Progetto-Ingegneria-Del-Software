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

childSchema.virtual('image', {
    ref: 'Image',
    localField: 'image_id',
    foreignField: 'image_id',
    justOne: true
})

childSchema.post('find', (profiles, next) => {
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].suspended) {
            if (profiles[i].image !== null) {
                profiles[i].image.path = '/images/profiles/user_default_photo.png'
                profiles[i].image.thumbnail_path =
                    '/images/profiles/user_default_photo.png'
            }
        }
    }
    next()
})
childSchema.post('findOne', (profile, next) => {
    if (profile !== null) {
        if (profile.suspended) {
            if (profile.image !== null) {
                profile.image.path = '/images/profiles/user_default_photo.png'
                profile.image.thumbnail_path =
                    '/images/profiles/user_default_photo.png'
            }
        }
    }
    next()
})

mongoose.pluralize(null)
const model = mongoose.model('Contact', contactSchema)

module.exports = model
