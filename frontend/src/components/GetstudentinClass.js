import { Box, IconButton, List, ListItem, ListItemText, CircularProgress, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';

const GetstudentinClass = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(""); // State to handle errors

    // Fetch students on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const userinfo = JSON.parse(localStorage.getItem("userInfo"));
                const token = userinfo.token;
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };

                const response = await axios.get('http://localhost:9000/teacher/student', config);
                setStudents(response.data); // Set students data from API response
                setLoading(false); // Stop loading after data is fetched
            } catch (err) {
                setError("Failed to fetch students");
                setLoading(false); // Stop loading if there is an error
            }
        };

        fetchStudents();
    }, []);

    return (
        <Box className="maincontainer">
            <Box className="secondcontainer">
                <IconButton>
                    <ReplyIcon style={{ cursor: "pointer" }} onClick={() => navigate("/teachers")} />
                </IconButton>

                {loading ? (
                    <CircularProgress /> // Show a loading spinner while fetching data
                ) : error ? (
                    <Typography variant="h6" color="error">{error}</Typography> // Display error message if there's an error
                ) : (
                    <List className='litems'>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <ListItem key={student._id}>
                                    <ListItemText primary={`${student.name} (ID: ${student._id})`} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography>No students found in this classroom</Typography>
                        )}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default GetstudentinClass;
