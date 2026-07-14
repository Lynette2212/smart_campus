import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/common/Login'
import StudentLayout from './components/StudentLayout'
import TeacherLayout from './components/TeacherLayout'
import LeaderLayout from './components/LeaderLayout'
import AdminLayout from './components/AdminLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import MyCourses from './pages/student/MyCourses'
import MyGrades from './pages/student/MyGrades'
import CourseList from './pages/student/CourseList'
import Schedule from './pages/student/Schedule'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import MyTeachCourses from './pages/teacher/MyTeachCourses'
import GradeManage from './pages/teacher/GradeManage'
import LeaderDashboard from './pages/leader/LeaderDashboard'
import StudentManage from './pages/leader/StudentManage'
import TeacherManage from './pages/leader/TeacherManage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AnnouncementManage from './pages/admin/AnnouncementManage'
import NewsManage from './pages/admin/NewsManage'
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
        <Route path="schedule" element={<Schedule />} />
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
      <Route path="/admin/*" element={<PrivateRoute role="ADMIN"><AdminLayout /></PrivateRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="announcements" element={<AnnouncementManage />} />
        <Route path="news" element={<NewsManage />} />
      </Route>
    </Routes>
  )
}

export default App
