const express = require("express");
const { Signin, Signup } = require("../controller/authController");
const route = express.Router();

route.get("/",(req,res)=>{
    res.end("server is stated")
})
route.post("/signin",Signin);
route.post("/signup",Signup);
module.exports = {route};

