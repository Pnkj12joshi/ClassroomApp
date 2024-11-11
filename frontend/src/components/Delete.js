import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton,  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';


const Delete = () => {
  const[email,setemail] = useState('');
  const navigate = useNavigate();
  const handledelete = async()=>{
    try{
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userinfo.token;
      console.log(token);
    
      const config ={
        headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        data: {
          email: email // Pass the email in the 'data' field within the config
        }
      };
      const response = await axios.delete(`http://localhost:9000/principal/user/delete`,config);
      console.log(response.data);
     if(response.status === 200){
      alert("User delete succesfully");
      navigate("/principal");
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
        handledelete();
        }}>
        <h1 style={{marginBottom:"10px"}}> Enter Email Id to delete  </h1>
    <TextField
            label="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
           <Button type="submit" variant="contained" color="primary" fullWidth >
            DELETE
          </Button>
    </form>
      </Box>
    </Box>
   </Box>
  )
}

export default Delete;
  