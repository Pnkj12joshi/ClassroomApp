const express = require("express");
const { createTimetable, manageStudents,getStudentsInClassroom} = require("../controller/teachercontroller");
const troute = express.Router();

troute.post("/createtimetable", createTimetable);
troute.post("/managestudent",manageStudents);
troute.get("/student",getStudentsInClassroom);

module.exports = {troute};