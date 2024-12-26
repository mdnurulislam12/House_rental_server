const router = require("express").Router()
const multer = require("multer")

const Listing = require("../models/Listing")
const User = require("../models/user")

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    },
});

const upload = multer({ storage });

/**Create Listing */

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        /**Take the information from the form */

        const { creator, category, type, streetAddress, aptSuite, city, province, country, guestCount, badroomCount, bedCount, bathroomCount, amenities, title, description, highlight, highlightDesc, price } = req.body;

        const listingPhotos = req.files

        if (!listingPhotos) {
            return res.status(400).send("No File Uploaded.")
        }

        const listingPhotoPaths = listingPhotos.map((file) => file.path)

        const newListing = new Listing({
            creator,
            category, type, streetAddress, aptSuite, city, province, country, guestCount, badroomCount, bedCount, bathroomCount, amenities, listingPhotoPaths, title, description, highlight, highlightDesc, price
        })
        await newListing.save()

        res.status(200).json(newListing)
    } catch (err) {
        res.status(400).json({ message: "Fail to create Listing", error: err.message })
        console.log(err)
    }
});

/**Get Listings By Categories*/

router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    try {
        let listings;
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator");
        } else {
            listings = await Listing.find().populate("creator");
        }

        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message });
        console.log(err);
    }
});

/**Get listings by search */
router.get("/search/:search", async (req, res)=>{
    const {search} = req.params

    try{
        let listings = []
        if(search === "all"){
            listings = await Listing.find().populate("creator")
        }else{
            listings = await Listing.find({
                $or: [
                    {category: {$regex: search, $options: "i"}},
                    {title: {$regex: search, $options: "i"}},
                ]
            }).populate("creator")
        }

        res.status(200).json(listings)
    }catch(err){
        res.status(404).json({ message: "Fail to fetch listings", error: err.message });
        console.log(err);
    }
})

/**Listing Details */
router.get("/:listingId", async (req, res)=>{
    try{
        const {listingId} = req.params
        const listing = await Listing.findById(listingId).populate("creator")
        res.status(202).json(listing)
    }catch(err){
        res.status(404).json({message: "Listing can not found!", error: err.message})
    }
})
module.exports = router

