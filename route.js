const express = require("express")
const route = express.Router()
const { SuperfaceClient  } = require("@superfaceai/one-sdk")
require("dotenv").config()


const sdk = new SuperfaceClient();


route.get("/hello/:visitor_name", async (req, res) => {

      const ipAddress = req.ip
      console.log(JSON.stringify(ipAddress))

    const user = req.params["visitor_name"]
    console.log(user.slice(14))

    //Location
    let location = ""

    //Load Profile
    const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");

    //USE profile
    const result = await profile.getUseCase("IpGeolocation").perform(
        {
            ipAddress: ipAddress
        },
        {
            provider: "ipdata",
            security: {
                apikey: {
                    apikey: process.env.API_KEY
                }
            }
        }
    )

    //result Handling 
    try {
        const data = result.unwrap();
        console.log(data)
        location = data
    } catch (error) {
        console.log(error)
    }


    res.json({
        "client_ip": ipAddress,
        "location": location,
        "greeting": `Hello ${user.slice(14)}! the temperature is 11 degrees Celcius in ${location}`
    })
})


module.exports = route