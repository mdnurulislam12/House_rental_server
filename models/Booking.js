const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    coustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }

},
    { timestamps: true }
)

const Booking = mongoose.model("Booking", BookingSchema)
module.exports = Booking