const mongoose = require('mongoose')
const realtors = require('../controllers/realtors')


const Schema = mongoose.Schema;

let commentsSchema = new Schema (
    {
        content: String,
        rating: { type: Number, min: 1, max: 5, default: 5},
        recommendation: { type: Boolean}
    },
    {   
        timestamps: true
    }
)
const realtorSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        company: {
            type: String
        },
        comments: [commentsSchema],
        home: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Home'
            }
        ]
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Realtor', realtorSchema)