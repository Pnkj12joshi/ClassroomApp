import { Box, Button, FormControl, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from "axios";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Popover from '@mui/material/Popover';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import "../App.css";

const StudentDashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [teacherId,setteacherId] = useState("");
  const[classroomId, setclassroomId] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
 
  const handleNavigation = (index) => {
    switch (index) {
      case 0:
        navigate('/timetable');
        break;
      case 1:
        navigate('/classmates');
        break;
      default:
        break;
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const handlelogout = async()=>{
    await localStorage.removeItem("userInfo");
    navigate("/");
}
const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>
      {['TimeTable', 'Classmates'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton  onClick={() => handleNavigation(index)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
  </Box>
)

  return (
   <Box className="maincontainer">
    <Box className="secondcontainer">
    <div className="pdiv">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box>{DrawerList}</Box>
          </Drawer>
          <IconButton onClick={handleClick}>
            <PermIdentityIcon />
          </IconButton>
          <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box className="popovercontainer">
        <Typography sx={{ p: 2 }}>email: student .</Typography>
        <Typography sx={{ p: 2 }}>role: student .</Typography>
        <Typography sx={{ p: 2, cursor:"pointer" }} onClick={handlelogout}> logout </Typography>
        </Box>
       
      </Popover>
        </div>
        <Box className="viewcontainer">
          <Box className="viewbox" onClick={()=>{navigate("/classmates")}}>
           ClassMates
          </Box>
          <Box className="viewbox"  onClick={()=>{navigate("/timetable")}} >
           Timetable
          </Box>
        </Box>  
        </Box>
   </Box>
  )
}


export default StudentDashboard;
