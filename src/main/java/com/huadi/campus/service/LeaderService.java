package com.huadi.campus.service;

import com.huadi.campus.entity.*;
import com.huadi.campus.repository.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LeaderService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final CourseSelectionRepository courseSelectionRepository;

    public LeaderService(StudentRepository studentRepository, TeacherRepository teacherRepository,
                         CourseRepository courseRepository, CourseSelectionRepository courseSelectionRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
        this.courseSelectionRepository = courseSelectionRepository;
    }

    public Map<String, Object> getStudentStatistics() {
        Map<String, Object> stats = new HashMap<>();
        List<Student> allStudents = studentRepository.findAll();
        stats.put("totalStudents", allStudents.size());
        Map<String, Long> byDepartment = allStudents.stream()
                .filter(s -> s.getDepartment() != null)
                .collect(Collectors.groupingBy(Student::getDepartment, Collectors.counting()));
        stats.put("byDepartment", byDepartment);
        Map<String, Long> byStatus = allStudents.stream()
                .filter(s -> s.getStatus() != null)
                .collect(Collectors.groupingBy(Student::getStatus, Collectors.counting()));
        stats.put("byStatus", byStatus);
        return stats;
    }

    public Map<String, Object> getTeacherStatistics() {
        Map<String, Object> stats = new HashMap<>();
        List<Teacher> allTeachers = teacherRepository.findAll();
        stats.put("totalTeachers", allTeachers.size());
        Map<String, Long> byType = allTeachers.stream()
                .filter(t -> t.getTeacherType() != null)
                .collect(Collectors.groupingBy(Teacher::getTeacherType, Collectors.counting()));
        stats.put("byType", byType);
        Map<String, Long> byDepartment = allTeachers.stream()
                .filter(t -> t.getDepartment() != null)
                .collect(Collectors.groupingBy(Teacher::getDepartment, Collectors.counting()));
        stats.put("byDepartment", byDepartment);
        return stats;
    }

    public Map<String, Object> getCourseSelectionStatistics() {
        Map<String, Object> stats = new HashMap<>();
        List<Course> courses = courseRepository.findAll();
        stats.put("totalCourses", courses.size());
        stats.put("totalSelected", courseSelectionRepository.count());
        return stats;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
}
