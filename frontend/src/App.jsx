import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/common/Login'
import StudentLayout from './components/StudentLayout'
import TeacherLayout from './components/TeacherLayout'
import LeaderLayout from './components/LeaderLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import MyCourses from './pages/student/MyCourses'
import MyGrades from './pages/student/MyGrades'
import CourseList from './pages/student/CourseList'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import MyTeachCourses from './pages/teacher/MyTeachCourses'
import GradeManage from './pages/teacher/GradeManage'
import LeaderDashboard from './pages/leader/LeaderDashboard'
import StudentManage from './pages/leader/StudentManage'
import TeacherManage from './pages/leader/TeacherManage'
import Home from './pages/common/Home'

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  if (!token) return <Navigate to="/login" />
  if (role && userRole !== role) return <Navigate to="/" />
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/*" element={<PrivateRoute role="STUDENT"><StudentLayout /></PrivateRoute>}>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="grades" element={<MyGrades />} />
      </Route>
      <Route path="/teacher/*" element={<PrivateRoute role="TEACHER"><TeacherLayout /></PrivateRoute>}>
        <Route index element={<TeacherDashboard />} />
        <Route path="courses" element={<MyTeachCourses />} />
        <Route path="grades/:courseId" element={<GradeManage />} />
      </Route>
      <Route path="/leader/*" element={<PrivateRoute role="LEADER"><LeaderLayout /></PrivateRoute>}>
        <Route index element={<LeaderDashboard />} />
        <Route path="students" element={<StudentManage />} />
        <Route path="teachers" element={<TeacherManage />} />
      </Route>
    </Routes>
  )
}

export default App
