const ClassroomUser = require("../model/Classroom");
const TeacherUser = require("../model/Teacher");
const StudentUser = require("../model/Student");

const CreateClassroom =  async(req,res)=>{
const {name,starttime,endtime,days} = req.body;
try{
  const role = req.user.role;
  if(role !=="principal"){
    return res.status(400).json({message:"You are not authorized person"});
  }

const classroom = new ClassroomUser({name,starttime,endtime,days});
await classroom.save();
res.status(201).json({"Classroom Created Sucessfully":classroom})
}
catch(error){
    console.log(error);
}

};
const assignTeacherToClassroom = async (req, res) => {
  const role = req.user.role;
    const { teacherId, classroomId } = req.body;
  
    try {
      if(role !=="principal"){
        return res.status(400).json({message:"You are not authorized person"});
      }
      const teacher = await TeacherUser.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      if (teacher.classroomId) {
        return res.status(400).json({ message: 'Teacher is already assigned to a classroom' });
    }

  
      teacher.classroomId = classroomId;
      await teacher.save();
  
      res.status(200).json({ message: 'Teacher assigned to classroom successfully' });
    } catch (err) {
      console.log(err.message);
    }
  };
  const assignStudentToTeacher = async (req, res) => {
    const role = req.user.role;
    const { studentId, teacherId } = req.body;

    try {
      if(role !=="principal"){
        return res.status(400).json({message:"You are not authorized person"});
      }
        const student = await StudentUser.findById(studentId);
        const teacher = await TeacherUser.findById(teacherId);
        console.log(student);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Assign student to the teacher's classroom
        student.classroomId = teacher.classroomId;
        await student.save();

        res.status(200).json({ message: 'Student assigned to teachers classroom successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTeachersAndStudents = async (req, res) => {
  const role = req.user.role;
    try {
      if(role !=="principal"){
        return res.status(400).json({message:"You are not authorized person"});
      }
      const teachers = await TeacherUser.find().populate('classroomId');
      const students = await StudentUser.find().populate('classroomId');
  
      res.status(200).json({ teachers, students });
    } catch (error) {
      console.log(err);
    }
  };

const updateUserDetails = async(req,res)=>{
  const role = req.user.role;
    const {name} = req.body;
    const{email} = req.body;
    try{
      if(role !=="principal"){
        return res.status(400).json({message:"You are not authorized person"});
      }
        const user = await TeacherUser.findOne({name}) || await StudentUser.findOne({name});
        if(!user){
            return res.status(401).json({message:`User not found`});
        }
        user.email = email;
        await user.save();
        res.status(200).json({message:'User Detail Update Sucessfully'});
    }
    catch(error){
        console.log(error);
    }
};
const deleteUserDetails = async(req,res)=>{
  const role = req.user.role;
   const {email} = req.body;
   try{
    if(role !=="principal"){
      return res.status(400).json({message:"You are not authorized person"});
    }
       const user = await TeacherUser.findOne({email}) || await StudentUser.findOne({email});
       if(!user){
        return res.status(401).json("User not found");
       }
       await user.deleteOne();
       res.status(200).json({message:'User Deleted Sucessfully'});
   }
   catch(error){
    console.log(error);
   }
};

module.exports = {CreateClassroom, getTeachersAndStudents,updateUserDetails,deleteUserDetails,assignTeacherToClassroom,assignStudentToTeacher};


