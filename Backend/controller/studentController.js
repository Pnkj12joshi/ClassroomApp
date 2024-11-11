const StudentUser = require("../model/Student");
const TimeTable = require("../model/Timetable");

const GetTimeTable = async(req,res)=>{
    const role = req.user.role;
try{
    if(role !=="student" && role!=="principal"){
        return res.status(400).json({message:"You are not authorized person"});
      }
    const studentId = req.user.userid;

    const student = await StudentUser.findById(studentId).populate('classroomId');

    if(!student){
        return res.status(404).json({message:"Student not found"});

    }
    const timetable = await TimeTable.findOne({ classroom: student.classroomId});
    if (!timetable) {
        return res.status(404).json({ message: 'Timetable not found' });
    }
    res.json(timetable);
}
catch(error){
console.log(error.message);
res.status(500).json({message:"Server Error"});
}
};
const GetClassmates = async(req,res)=>{
    const role = req.user.role;
    try{
        if(role !=="student"){
            return res.status(400).json({message:"You are not authorized person"});
          }
        const studentId = req.user.userid;
        const student = await StudentUser.findById(studentId).populate('classroomId');
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        const classmates = await StudentUser.find({classroom:student.classroom}).select('-password');
        res.json(classmates);

    }
    catch(error){
    console.error(error.message);
    res.status(500).json({message:'Server error'});
    }
};

module.exports = {GetClassmates,GetTimeTable};