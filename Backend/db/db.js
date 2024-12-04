const mongoose =  require("mongoose");

const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to mongoDb")
    }catch(error){
        console.error("mongoDb connection failed:", error.message)
    }
}

module.exports = connectToDb