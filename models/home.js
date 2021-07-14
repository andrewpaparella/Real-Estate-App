const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const homesSchema = new Schema ( 
    {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            min: 0,
            required: true
        },
        squareFeet: {
            type: Number,
            min: 0,
            required: true
        },
        bathrooms: {
            type: Number,
            min: 0,
            required: true
        },
        bedrooms: {
            type: Number,
            min: 0,
            required: true
        },
        pool: {
            type: Boolean,
        },
        lotsize: {
            type: Number,
            min: 0
        },
        numberOfStories: {
            type: Number,
            min: 1,
            default: 1
        },
        daysOnMarket: {
            type: Number
        },
        yearBuilt: {
            type: Number
        },
        state: {
            type: String,
            enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','VI','WA','WV','WI','WY']
        },
        realtor: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Realtor',
            }
        ]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Home', homesSchema)