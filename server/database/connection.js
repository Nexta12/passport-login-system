const mongoose = require("mongoose")

const dbConnection = async ()=>{

    try {

        await mongoose.connect(process.env.MONGO_URI)

        console.log("Server connected to database")
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnection;