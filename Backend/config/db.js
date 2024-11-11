const mongoose = require("mongoose");
const connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.Mongo_url);
        console.log(`Mongodb is conneceted:${con.connection.host}`)
    }
    catch(error){
        console.log(error.message);

    }
}
module.exports = connectDB;