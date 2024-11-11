import React from 'react';
import { Box, IconButton } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

import '../App.css';

const PrincipalDashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
 
  const handleNavigation = (index) => {
    switch (index) {
      case 0:
        navigate('/createclassroom');
        break;
      case 1:
        navigate('/assignteacher');
        break;
      case 2:
        navigate('/assignstudent');
        break;
        case 3:
          navigate("/updateuser");
          break;
          case 4:
            navigate("/deleteuser");
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
        {['Classroom-creation', 'Assign-Teacher', 'Assign-Student','Update', 'Delete'].map((text, index) => (
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
        <Typography sx={{ p: 2 }}>email: Principal .</Typography>
        <Typography sx={{ p: 2 }}>role: Principal .</Typography>
        <Typography sx={{ p: 2, cursor:"pointer" }} onClick={handlelogout}> logout </Typography>
        </Box>
       
      </Popover>
        </div>
        <Box className="viewcontainer">
          <p style={{fontSize:"2rem"}}> Principal Dashboard</p>
        </Box>  
      </Box>
    </Box>
  );
};

export default PrincipalDashboard;
