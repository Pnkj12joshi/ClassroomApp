    const mongoose = require("mongoose");
    const ClassroomSchema = mongoose.Schema({
        name:{
        type:String,
        required:true,
        },
        starttime:{
        type:String,
        required:true,
        },
        endtime:{  
        type:String,
        required:true,
        },
        days:{
        type:String,
        required:true,
        },
    });
    const ClassroomUser = mongoose.model("ClassroomUser", ClassroomSchema);
    module.exports = ClassroomUser;