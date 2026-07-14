import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response.data,
  error => {
    const msg = error.response?.data?.message || '请求失败'
    return Promise.reject(new Error(msg))
  }
)

// 认证
export const login = (data) => api.post('/auth/login', data)
export const register = (data) => api.post('/auth/register', data)

// 通用
export const getAnnouncements = (type) => api.get('/common/announcements', { params: { type } })
export const getAnnouncement = (id) => api.get(`/common/announcements/${id}`)
export const createAnnouncement = (data) => api.post('/common/announcements', data)
export const getNews = (category) => api.get('/common/news', { params: { category } })
export const getNewsDetail = (id) => api.get(`/common/news/${id}`)
export const createNews = (data) => api.post('/common/news', data)
export const getCourses = (params) => api.get('/common/courses', { params })
export const getCourse = (id) => api.get(`/common/courses/${id}`)

// 学生
export const getStudentProfile = () => api.get('/student/profile')
export const updateContact = (params) => api.put('/student/contact', null, { params })
export const getMyCourses = () => api.get('/student/courses')
export const selectCourse = (courseId) => api.post(`/student/courses/${courseId}/select`)
export const dropCourse = (courseId) => api.delete(`/student/courses/${courseId}/drop`)
export const getMyGrades = (semester) => api.get('/student/grades', { params: { semester } })

// 教师
export const getTeacherProfile = () => api.get('/teacher/profile')
export const getTeacherCourses = () => api.get('/teacher/courses')
export const getCourseStudents = (courseId) => api.get(`/teacher/courses/${courseId}/students`)
export const saveGrade = (courseId, params) => api.post(`/teacher/courses/${courseId}/grades`, null, { params })
export const getCourseGrades = (courseId) => api.get(`/teacher/courses/${courseId}/grades`)

// 领导
export const getStudentStats = () => api.get('/leader/statistics/students')
export const getTeacherStats = () => api.get('/leader/statistics/teachers')
export const getCourseStats = () => api.get('/leader/statistics/courses')
export const getAllStudents = () => api.get('/leader/students')
export const getAllTeachers = () => api.get('/leader/teachers')

export default api
