import React from 'react'
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import PrincipalDashboard from './components/PrincipalDashboard'
import Login_Signup from './components/Login-Signup'
import StudentDashboard from './components/StudentDashboard'
import TeachersDashboard from './components/TeachersDashboard'
import Classroom from './components/Classroom'
import "./App.css";
import Signup from './components/Signup'
import Timetable from './components/Timetable'
import CreateClassroom from './components/CreateClassroom'
import AssignTeacher from './components/Assign-Teacher'
import AssignStudent from './components/AssignStudent'
import Update from './components/Update'
import Delete from './components/Delete'
import Createtimetable from './components/Createtimetable'
import Managestudent from './components/Managestudent'
import GetstudentinClass from './components/GetstudentinClass'
import Classmates from './components/Classmates'


const App = () => {

  return (
    <div>
      <Router>
     <Routes>
            <Route path ="/principal" element={<PrincipalDashboard/>}/>
            <Route path ="/" element={<Login_Signup/>}/>
            <Route path ="/signup" element={<Signup/>}/>
            <Route path = "/student" element={<StudentDashboard/>}/>
            <Route path ="/teachers" element={<TeachersDashboard/>}/>
            <Route path="/classroom" element={<Classroom />} />
            <Route path='/timetable' element={<Timetable/>}/>
            <Route path='/createclassroom' element={<CreateClassroom/>}/>
            <Route path='/assignteacher' element={<AssignTeacher/>}/>
            <Route path='/assignstudent' element={<AssignStudent/>}/>
            <Route path='/updateuser' element={<Update/>}/>
            <Route path='/deleteuser' element={<Delete/>}/>
            <Route path='/createtimetable' element={<Createtimetable/>}/>
            <Route path='/managestudent' element={<Managestudent/>}/>   
            <Route path='/getstudentinclass' element={<GetstudentinClass/>}/> 
            <Route path='/classmates' element={<Classmates/>}/>         
        </Routes>
      </Router>
</div>
  )
}

export default App
