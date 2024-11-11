import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import "../App.css";

const Timetable = () => {
  const navigate = useNavigate();
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch timetable when the component mounts
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userinfo.token; 
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get('http://localhost:9000/student/gettimetable', config);
        setTimetable(response.data); // Set the timetable data here
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="maincontainer">
      <Box className="secondcontainer">
        <IconButton onClick={() => navigate("/student")}>
          <ReplyIcon style={{ cursor: "pointer" }} />
        </IconButton>
        <Box className="timetable-container">
          <Typography variant="h6">Timetable</Typography>
          {timetable && timetable.schedule && timetable.schedule.length > 0 ? (
            timetable.schedule.map((daySchedule, index) => (
              <Box key={index}>
                <Typography variant="h6">{daySchedule.day}</Typography>
                {daySchedule.periods.map((period, i) => (
                  <Box key={i}>
                    <Typography>
                      {period.subject} (Teacher: {period.teacher}) from {period.startTime} to {period.endTime}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <Typography>No timetable data available</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Timetable;
