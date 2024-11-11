import { Box, IconButton, TextField, Grid, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';

const Createtimetable = () => {
    const navigate = useNavigate();
    const [classroomId, setClassroomId] = useState(""); // State for classroom ID
    const [timetableData, setTimetableData] = useState([
        { day: "", periods: [{ subject: "", teacher: "", startTime: "", endTime: "" }] }
    ]);

    const handlesave = async () => {
        try {
            const userinfo = JSON.parse(localStorage.getItem("userInfo"));
            const token = userinfo.token;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            };

            const data = {
                classroomId: classroomId, // Send classroomId
                timetableData: timetableData, // Send timetableData from state
            };

            const response = await axios.post("http://localhost:9000/teacher/createTimetable", data, config);
            console.log(response.data);
            setClassroomId(""); 
            setTimetableData([
                { day: "", periods: [{ subject: "", teacher: "", startTime: "", endTime: "" }] }
            ]);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleInputChange = (entryIndex, periodIndex, field, value) => {
        const updatedTimetable = [...timetableData];  // here shallow copy pf timetableData is created here 
        updatedTimetable[entryIndex].periods[periodIndex][field] = value;
        setTimetableData(updatedTimetable);
    };

    // const addPeriod = (entryIndex) => {
    //     const updatedTimetable = [...timetableData];
    //     updatedTimetable[entryIndex].periods.push({ subject: "", teacher: "", startTime: "", endTime: "" });
    //     setTimetableData(updatedTimetable);
    // };

    // const addTimetableEntry = () => {
    //     setTimetableData([...timetableData, { day: "", periods: [{ subject: "", teacher: "", startTime: "", endTime: "" }] }]);
    // };

    return (
        <Box className="maincontainer">
            <Box className="secondcontainer">
                <IconButton>
                    <ReplyIcon style={{ cursor: "pointer" }} onClick={() => navigate("/teachers")} />
                </IconButton>
                <Box className="formclass">
                    <form>
                        <TextField
                            id="outlined-basic"
                            label="Classroom ID"
                            variant="outlined"
                            value={classroomId}
                            onChange={(e) => setClassroomId(e.target.value)}
                        />
                        {timetableData.map((entry, entryIndex) => (
                            <Box key={entryIndex} sx={{ mt: 2 }}>
                                <TextField
                                    label="Day"
                                    variant="outlined"
                                    fullWidth
                                    value={entry.day}
                                    onChange={(e) => {
                                        const updatedTimetable = [...timetableData];
                                        updatedTimetable[entryIndex].day = e.target.value;
                                        setTimetableData(updatedTimetable);
                                    }}
                                    margin="normal"
                                />
                                {entry.periods.map((period, periodIndex) => (
                                    <Box key={periodIndex} sx={{ mt: 2 }}>
                                        <TextField
                                            label="Subject"
                                            variant="outlined"
                                            fullWidth
                                            value={period.subject}
                                            onChange={(e) => handleInputChange(entryIndex, periodIndex, 'subject', e.target.value)}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Teacher ID"
                                            variant="outlined"
                                            fullWidth
                                            value={period.teacher}
                                            onChange={(e) => handleInputChange(entryIndex, periodIndex, 'teacher', e.target.value)}
                                            margin="normal"
                                        />
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Start Time"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={period.startTime}
                                                    onChange={(e) => handleInputChange(entryIndex, periodIndex, 'startTime', e.target.value)}
                                                    margin="normal"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="End Time"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={period.endTime}
                                                    onChange={(e) => handleInputChange(entryIndex, periodIndex, 'endTime', e.target.value)}
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                                
                            </Box>
                        ))}
                        

                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlesave}>
                            Save Timetable
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Createtimetable;
