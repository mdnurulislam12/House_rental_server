const router = require("express").Router()

const Booking = require("../models/Booking")

/**Create Booking */
router.post("/create", async (req, res)=>{
    try{
        const {coustomerId, hostId, listingId, startDate, endDate, totalPrice} = req.body
        const newBooking = new Booking({coustomerId, hostId, listingId, startDate, endDate, totalPrice})
        await newBooking.save()
        res.status(200).json(newBooking)
    }catch (err){
        console.log(err)
        res.status(400).json({message: "Fail to create a new Booking!", error: err.message})
    }
})

module.exports = router

