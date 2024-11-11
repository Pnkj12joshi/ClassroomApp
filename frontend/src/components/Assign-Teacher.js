import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from "axios";

const AssignTeacher = () => {
  const navigate = useNavigate();
  const [teacherId,setteacherId] = useState("");
  const[classroomId, setclassroomId] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

const handleSubmit = async () => {


  try {
     const userinformation = localStorage.getItem('userInfo');
     console.log(userinformation);
     const userinfo = JSON.parse(userinformation); // Parse the string to JSON
     const token = userinfo.token; // Extract the token
     console.log(token);
 
    if (!token) {
     setError('No token found, please log in again.');
      return;
  }
      const config = {
    headers:{
           'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`,

    },
  };
 const response = await axios.post('http://localhost:9000/principal/assignteachtoclassroom', {teacherId,classroomId},config);
 console.log(response);
 if (response.status === 200) {
  setMessage(response.data.message);
 console.log(response.data.message);
   navigate("/principal");
   
  } else {
    setError(response.data.message);
  console.error(response.data.message || "Internal error");
 }
  } catch (error) {
setError('Something went wrong. Please try again.'); }
 console.log("hello");
}

// const  display = ()=>{
//   console.log("display");

// }


  return (
   <Box className="maincontainer">
    <Box className="secondcontainer">
    <IconButton  onClick={()=>(navigate("/principal"))}>
      <ReplyIcon style={{cursor:"pointer"}}/>
      </IconButton>
        <Box className="classroombox">
        <form onSubmit={(e) => { 
     e.preventDefault(); 
  handleSubmit();
}}>
        <h1 style={{marginBottom:"10px"}}> Assign Teacher to Classroom </h1>
    <TextField
            label="Teacher ID"
            value={teacherId}
            onChange={(e) => setteacherId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Classroom ID"
            value={classroomId}
            onChange={(e) => setclassroomId(e.target.value)}
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

export default AssignTeacher;
