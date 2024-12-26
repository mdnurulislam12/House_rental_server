const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema(
    {
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        category:{
            type: String,
            require: true,
        },
        type:{
            type: String,
            require: true,
        },
        streetAddress:{
            type: String,
            require: true,
        },
        aptSuite:{
            type: String,
            require: true,
        },
        city:{
            type: String,
            require: true,
        },
        province:{
            type: String,
            require: true,
        },
        country:{
            type: String,
            require: true,
        },
        guestCount: {
            type: Number,
            require: true,
        },
        badroomCount: {
            type: Number,
            require: true,
        },
        bedCount: {
            type: Number,
            require: true,
        },
        bathroomCount: {
            type: Number,
            require: true,
        },
        amenities: {
            type: Array,
            default: [],
        },
        listingPhotoPaths:[{type: String}],// store photo urls
        title:{
            type: String,
            require: true,
        },
        description:{
            type: String,
            require: true,
        },
        highlight:{
            type: String,
            require: true,
        },
        highlightDesc:{
            type: String,
            require: true,
        },
        price:{
            type: String,
            require: true,
        },
    },
    
    {timestamps: true}
)

const Listing = new mongoose.model("Listing", ListingSchema)
module.exports = Listing