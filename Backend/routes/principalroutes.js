const express = require("express");
const  {CreateClassroom, getTeachersAndStudents,updateUserDetails,deleteUserDetails,assignTeacherToClassroom,assignStudentToTeacher} = require("../controller/principalController");
const prouter = express.Router();
prouter.post('/createclassroom', CreateClassroom);
prouter.post('/assignteachtoclassroom', assignTeacherToClassroom);
prouter.get("/users", getTeachersAndStudents);
prouter.put("/user", updateUserDetails);
prouter.delete("/user/delete",deleteUserDetails);
prouter.post('/assignstudenttoteacher', assignStudentToTeacher);

module.exports = {prouter};
