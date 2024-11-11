import { Box, Button, FormControl, IconButton, TextField } from '@mui/material';
import React from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';


const Classroom = () => {
  const classroomsubmit = async()=>{
    console.log("hello");
  }
  const navigate = useNavigate();
  return (
      <Box className="maincontainer">
        <Box className="secondcontainer">
        <IconButton>
      <ReplyIcon style={{cursor:"pointer"}} onClick={()=>navigate("/principal")}/>
      </IconButton>
        </Box>
      </Box>
     
  )
}

export default Classroom
