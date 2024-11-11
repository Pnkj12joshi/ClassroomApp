const Principaluser = require("../model/Principal");
const TeacherUser = require("../model/Teacher");
const StudentUser = require("../model/Student");
const  bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Signin = async(req,res)=>{
   const{email,password,role} = req.body;
   let user;
   try{
   if(role ==="principal"){
      user = await Principaluser.findOne({email});
   }
   else if(role === "teacher"){
      user = await TeacherUser.findOne({email});
   }
   else if(role ==="student"){
      user = await StudentUser.findOne({email});
   }
   if(!user || !await(bcrypt.compare(password,user.password))){
      return res.status(401).json({message:"Invalid email or Password"});
   }
   const token = jwt.sign({userid:user._id,role},process.env.JWT_SECRET);
   res.status(200).json({token,userid:user._id,role});
   }
   catch(error){
      console.log(error);
   }
};

const Signup = async(req,res)=>{
    const {email,password,role} = req.body;
    try{
    const hashedpassword = await bcrypt.hash(password,12); //here we do hashing..
    let user;
    if(role === "teacher"){
      user = new TeacherUser({email,password:hashedpassword,role});
    }
    else if(role ==="student"){
      user = new StudentUser({email,password:hashedpassword,role});
    }
    await user.save();
    res.status(201).json({message:`${role} created sucessfully`, userid:user._id});
    }
    catch(error){
      console.log(error);
    }
  };

  module.exports = {Signin,Signup};