const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema({
    name:{
        type:String,
    },
   
    email:{
    type:String,
    required:true,
    unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    classroomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ClassroomUser",
},
role:{
    type:String,
}
});
const StudentUser = mongoose.model("StudentUser", StudentSchema);
// StudentUser.bulkWrite([
//     {
//         updateOne: {
//             filter: { email: "hpreet@gmail.com" },
//             update: { $set: { name: "Hpreet Singh" } },
//         }
//     },
//     {
//         updateOne: {
//             filter: { email: "rishi@gmail.com" },
//             update: { $set: { name: "Rishi Singh" } },
//         }
//     },
//     {
//         updateOne: {
//             filter: { email: "nimish@gmail.com" },
//             update: { $set: { name: "Nimish Singh" } },
//         }
//     }
// ])
// .then(result => {
//     console.log('Students updated:', result);
// })
// .catch(err => {
//     console.error('Error updating students:', err);
// });
module.exports = StudentUser;