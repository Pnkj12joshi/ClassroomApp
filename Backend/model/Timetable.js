const mongoose = require('mongoose');

const TimeTableSchema = mongoose.Schema({
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomUser',
    },
    schedule: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true,
        },
        periods: [{
            subject: {
                type: String,
                required: true
            },
            teacher: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'TeacherUser',
                required: true,
            },
            startTime: {
                type: String, 
                required: true,
            },
            endTime: {
                type: String,  
                required: true
            }
        }]
    }]
}, {
    timestamps: true
});
const TimeTable = mongoose.model("TimeTable", TimeTableSchema);

module.exports =  TimeTable;
