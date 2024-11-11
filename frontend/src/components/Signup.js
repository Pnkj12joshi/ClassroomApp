import React, { useState } from 'react'
import Box from '@mui/material/Box';
import "../App.css";
import { Button, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
   const[email,setemail] = useState("");
   const[password,setpassword]= useState("");
   const[loading,setloading] = useState(false);
   const[role,setrole] = useState("");

    const signuphandler = async()=>{
      setloading(true);
      if( !email || password || role){
        console.log("please fill the details");
      }
      try{
        // const config ={
        //   headers:{
        //    "Content-type":"application/json"
        //   }
        // };
        const {data} = await axios.post("http://localhost:9000/signup",{email,password,role});
        console.log("RagisterSucessful");
        setloading(false);
        navigate("/principal");

      }
      catch(error){
        console.log(error);
      }

    }
  return (
    <div className='container'>
      <Box className="loginbox">
    
      <FormControl>
      <h1 className='loginsignupheading'> Signup </h1>
      <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{setemail(e.target.value);}} />
      <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>{setpassword(e.target.value);}}/>
      <TextField id="outlined-basic" label="Role" variant="outlined" onChange={(e)=>{setrole(e.target.value);}} />
        <Button onClick={signuphandler} variant='contained'> submit </Button>
        <Link to ="/"style={{textAlign:"center"}}> Login</Link>
      </FormControl>
      </Box>
    </div>
  )
}

export default Signup
