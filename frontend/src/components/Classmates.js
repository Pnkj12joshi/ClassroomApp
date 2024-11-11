import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from "axios";

const Classmates = () => {
  const navigate = useNavigate();
  const [classmates, setClassmates] = useState([]);

  const showClassroom = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if (!userInfo || !userInfo.token || !userInfo.userid) {
        console.log('No token or user ID found, please log in again.');
        return;
      }

      const token = userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      };

      const response = await axios.get("http://localhost:9000/student/getclassmates", config);

      // Log the response to confirm the structure
      console.log(response.data);

      // Ensure that the response is an array and set it to state
      if (Array.isArray(response.data)) {
        setClassmates(response.data);
        console.log(classmates);
      } else {
        setClassmates([response.data]);
      }
    } catch (error) {
      console.log('Error fetching classmates:', error.message);
      setClassmates([]);  // Ensure state is set to an empty array in case of error
    }
  };

  useEffect(() => {
    showClassroom();
  }, []);

  return (
    <Box className="maincontainer">
      <Box className="secondcontainer">
        <IconButton onClick={() => navigate("/student")}>
          <ReplyIcon style={{ cursor: "pointer" }} />
        </IconButton>
        <Box className="classroombox">
          {classmates.length === 0 ? (
            <Typography>No classmates found.</Typography>
          ) : (
            <List>
              {classmates.map((classmate) => (
                <ListItem key={classmate._id}>
                  <ListItemAvatar>
                    <Avatar>{classmate?.name ? classmate.name.charAt(0).toUpperCase() : '?'}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={classmate?.name || "No Name Available"}
                    secondary={classmate?.email || "No Email Available"}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Classmates;
