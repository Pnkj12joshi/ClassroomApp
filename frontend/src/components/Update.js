import { Box, IconButton,TextField, Button} from '@mui/material';
import React, { useState } from 'react'
import "../App.css";
import {useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';

const Update = () => {
  const navigate = useNavigate();
  const [email,setemail] = useState("");
  const [name,setname] = useState("");
  const updateinfo = async()=>{
    try{
        const userinfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userinfo.token;
        console.log(token);
      
        const config ={
          headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          },
        };
        const response = await axios.put(`http://localhost:9000/principal/user`,{email,name},config);
        console.log(response.data);
       if(response.status === 200){
        alert("User detail succesfully");
       }
      
    }
    catch(error){
      console.log(error.message);
    }
  }
  return (
    <Box className="maincontainer">
    <Box className="secondcontainer">
    <IconButton>
      <ReplyIcon style={{cursor:"pointer"}} onClick={()=>navigate("/principal")}/>
      </IconButton>
      <Box className="classroombox">
      <form onSubmit={(e)=>{
       e.preventDefault();
       updateinfo();     
      }}>
        <h1 style={{marginBottom:"10px"}}> Enter Email Id to Update </h1>
        <TextField
            label="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
    <TextField
            label="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
           <Button type="submit" variant="contained" color="primary" fullWidth >
            Update
          </Button>
    </form>
      </Box>
      </Box>
   </Box>
  )
}

export default Update;
