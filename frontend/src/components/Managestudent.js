import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';


const Managestudent = () => {
    const navigate = useNavigate();
    const [studentid,setstudentid] = useState("");
    const [teacherid, setteacherid] = useState("");


    const handleAdd = async()=>{
      try{
        const userinfo = JSON.parse(localStorage.getItem("userInfo"));
            const token = userinfo.token;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            };

          const response = await axios.post("http://localhost:9000/teacher/managestudent", {studentid,teacherid}, config);
          console.log(response.data);
          setstudentid("");
          setteacherid("");
      }
     catch(error){
      console.log(error.message);

     }
    }
    return (
      <Box className="maincontainer">
      <Box className="secondcontainer">
      <IconButton>
        <ReplyIcon style={{cursor:"pointer"}} onClick={()=>navigate("/teachers")}/>
        </IconButton>
       <Box className="formclass">
       <form>
        <TextField label="Studentid" variant="outlined" sx={{margin:"5px"}} onChange={(e)=>setstudentid(e.target.value)}/>
        <TextField label="TeacherId" variant='outlined' sx={{margin:"5px"}} onChange={(e)=>setteacherid(e.teacherid)}/>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAdd}> Add </Button>
       </form>
       </Box>
       
      </Box>
     </Box>
    )
}

export default Managestudent
