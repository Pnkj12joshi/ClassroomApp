const mongoose = require("mongoose");
const TeacherSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    classroomId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"ClassroomUser",
    },
    role:{
        type:String,
    },
    name: {
        type: String, // Added the name field here
    }
})
const TeacherUser = mongoose.model("TeacherUser",TeacherSchema);
// TeacherUser.bulkWrite([
//     {
//         updateOne: {
//             filter: { email: 'shiwali@gmail.com' },
//             update: { $set: { name: 'Shiwali' } }
//         }
//     },
//     {
//         updateOne: {
//             filter: { email: 'pj@gmail.com' },
//             update: { $set: { name: 'Piyush' } }
//         }
//     },
//     {
//         updateOne: {
//             filter: { email: 'akshat@gmail.com' },
//             update: { $set: { name: 'Akshat' } }
//         }
//     },
//     {
//         updateOne: {
//             filter: { email: 'anshul@gmail.com' },
//             update: { $set: { name: 'Anshul' } }
//         }
//     },
// ]).then(result => {
//     console.log('Teachers updated:', result);
// }).catch(err => {
//     console.error('Error updating teachers:', err);
// });

module.exports= TeacherUser;