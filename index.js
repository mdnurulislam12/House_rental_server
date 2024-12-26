const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")



const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const UserRoutes = require("./routes/User.js")


//nurulislam86061907
//JFLUowOK5yTFC6MI

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

/**routes */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", UserRoutes)

/**Mongoose setup */
const PORT = 3001
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "House_R_M_S",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
.catch((err) => console.log(`${err} did not connect`))