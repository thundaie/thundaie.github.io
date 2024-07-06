const express = require("express")
const app = express()
require("dotenv").config()
const visitorInfo = require("./route")
const cors = require("cors")

const PORT = process.env.PORT

//mIDDLEware
app.set("trust proxy", true);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))

app.get("/", (req, res) => {
   const add = req.ip

   res.json({
    message: `Your ip address is ${add}`
   })
})

app.use("/api", visitorInfo)





app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`)
})
