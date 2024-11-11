import { Box, IconButton, TextField, Button } from '@mui/material';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import React, { useState } from 'react';
import axios from 'axios';


const AssignStudent = () => {
const navigate = useNavigate();
const [teacherId,setteacherId] = useState("");
  const[studentId, setstudentId] = useState("");
  const handleSumbit = async ()=>{
   try{
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userinfo.token;
  console.log(token);
  if(!token){
    console.log("You are not authorized user");
    return;
  }
  const config = {
    headers:{
           'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,

    },
  };
  const response = await axios.post("http://localhost:9000/principal/assignstudenttoteacher", {teacherId,studentId},config);
   console.log(response.data);
   navigate("/principal");
}
   catch(error){
    console.error(error.message);
   }
  }
  return (
    <Box className="maincontainer">
    <Box className="secondcontainer">
    <IconButton>
      <ReplyIcon style={{cursor:"pointer"}} onClick={()=>navigate("/principal")}/>
      </IconButton>
      <Box className = "classroombox">
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleSumbit();
        }}>
        <h1 style={{marginBottom:"10px"}}> Assign Student to Classroom </h1>
    <TextField
            label="Student ID"
            value={studentId}
            onChange={(e) => setstudentId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Teacher ID"
            value={teacherId}
            onChange={(e) => setteacherId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth >
            Assign
          </Button>
    </form>
      </Box>
     
    </Box>
   </Box>
  )
}

export default AssignStudent
