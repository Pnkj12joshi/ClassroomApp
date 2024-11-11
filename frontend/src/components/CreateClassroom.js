import { Box, Button, FormControl, IconButton } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "../App.css";
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const CreateClassroom = () => {
  const [name,setname] = useState("");
  const [starttime,setstarttime] = useState("");
  const [endtime,setendtime] = useState("");
  const [days,setdays] = useState("");
 const navigate = useNavigate();

  const classroomcreation = async ()=>{
   try{
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userinfo.token;
    console.log(token);
    if(!token){
      console.log("user is not authorized");
    }
    const config={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

    };
    const responce = await axios.post("http://localhost:9000/principal/createclassroom", {name,starttime,endtime,days},config);
    console.log(responce.data);
    setname("");
    setstarttime("");
    setendtime("");
    setdays("");
    navigate("/principal");
    }
    catch(error){
      console.error(error.message);
    }
   
  }
   

  return (
    <Box className='maincontainer'>
      <Box className="secondcontainer">
      <IconButton>
      <ReplyIcon style={{cursor:"pointer"}} onClick={()=>navigate("/principal")}/>
      </IconButton>
      <Box className="classroombox"> 
      <FormControl >
        <h1 style={{marginBottom:"10px"}}> Classroom </h1>
   <TextField  value={name} id="outlined-basic" label="name" variant="outlined"  onChange={(e)=> setname(e.target.value)}/>
   <TextField value={starttime}  id="outlined-basic" label="Start Time" variant="outlined"onChange={(e)=> setstarttime(e.target.value)} />
   <TextField value={endtime}  id="outlined-basic" label="End Time" variant="outlined" onChange={(e)=> setendtime(e.target.value)} />
   <TextField value={days} id="outlined-basic" label="Days" variant="outlined"  onChange={(e)=> setdays(e.target.value)}/>
   <Button variant='contained' style={{marginTop:"10px"}} onClick={classroomcreation} > Create </Button>
 </FormControl>
       </Box>
      </Box>
     
    </Box>
  )
}

export default CreateClassroom
