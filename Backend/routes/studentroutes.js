const express = require("express");
const { GetTimeTable, GetClassmates } = require("../controller/studentController");
const sroute = express.Router();

sroute.get("/gettimetable", GetTimeTable);
sroute.get("/getclassmates",GetClassmates);

module.exports = {sroute};