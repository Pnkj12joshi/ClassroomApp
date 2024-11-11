import React, { useState } from 'react'
import Box from '@mui/material/Box';
import "../App.css";
import { Button, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login_Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const[role,setrole] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate(); 

  const loginhandeler= async()=>{
    setloading(true);
  if(!email ||!password || role){
    console.log("pls fill the details")
  }
  try{
    const config ={
      headers:{
        "Content-type":"application/json",
      },
    };
    const {data} = await axios.post("http://localhost:9000/signin", {email,password,role},config);
    console.log("Login Sucessful");
    localStorage.setItem("userInfo", JSON.stringify(data));
    setloading(false);
    if(role === "principal")
    navigate("/principal");
  else if(role ==="teacher"){
    navigate("/teachers");
  }
  else{
    navigate("/student");
  }
  }
  catch(error){
  console.log(error.message);
  }
  }
  return (
    <div className='container'>
      <Box className="loginbox">
    
      <FormControl>
      <h1 className='loginsignupheading'> Login </h1>
      <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => {
            setemail(e.target.value);
          }} />
      <TextField id="outlined-basic" type='password' label="Password" variant="outlined" onChange={(e) => {
            setpassword(e.target.value);
          }}/>
      <TextField id="outlined-basic" label="Role" variant="outlined" onChange={(e) => {
            setrole(e.target.value);
          }} />
        <Button onClick={loginhandeler}variant='contained'> submit </Button>
        <Link to ="/signup" style={{textAlign:"center"}}> Signup</Link>
      </FormControl>
      </Box>
    </div>
  )
}

export default Login_Signup
