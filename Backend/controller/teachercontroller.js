const TeacherUser = require('../model/Teacher');
const StudentUser = require('../model/Student');
const ClassroomUser = require('../model/Classroom');
const TimeTable = require('../model/Timetable');


const createTimetable = async (req, res) => {
    const role = req.user.role;
    try {
        if(role !=="teacher"){
            return res.status(400).json({message:"You are not authorized person"});
          }
        const {classroomId, timetableData } = req.body;

        let timetable = await TimeTable.findOne({ classroom: classroomId });

        if (timetable) {

            timetable.schedule = timetableData;
            await timetable.save();
            return res.json({ message: 'Timetable updated', timetable });
        } else {
            // Create new timetable
            timetable = new TimeTable({
                classroom: classroomId,
                schedule: timetableData
            });
            await timetable.save();
            return res.json({ message: 'Timetable created', timetable });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


const manageStudents = async (req, res) => {
    const role = req.user.role;
    try {
        if(role !=="teacher"){
            return res.status(400).json({message:"You are not authorized person"});
          }
        const { studentId, classroomId } = req.body;

        let student = await StudentUser.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.classroomId = classroomId;
        await student.save();

        res.json({ message: 'Student assigned to classroom', student });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
const getStudentsInClassroom = async (req, res) => {
    const role = req.user.role;
    const teacherId = req.user.userid;

    try {
        if(role !=="teacher"){
            return res.status(400).json({message:"You are not authorized person"});
          }
        const teacher = await TeacherUser.findById(teacherId).populate('classroomId');
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const students = await StudentUser.find({ classroomId: teacher.classroomId }).select('-password');
        res.status(200).json(students);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {createTimetable,manageStudents,getStudentsInClassroom};
