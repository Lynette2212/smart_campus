package com.huadi.campus.service;

import com.huadi.campus.entity.*;
import com.huadi.campus.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final CourseSelectionRepository courseSelectionRepository;
    private final GradeRepository gradeRepository;

    public StudentService(StudentRepository studentRepository, CourseRepository courseRepository,
                          CourseSelectionRepository courseSelectionRepository, GradeRepository gradeRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.courseSelectionRepository = courseSelectionRepository;
        this.gradeRepository = gradeRepository;
    }

    public Student getByUserId(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("学生信息不存在"));
    }

    @Transactional
    public CourseSelection selectCourse(Long userId, Long courseId) {
        Student student = getByUserId(userId);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("课程不存在"));
        if (courseSelectionRepository.findByStudentIdAndCourseId(student.getId(), courseId).isPresent()) {
            throw new RuntimeException("已选择该课程");
        }
        if (course.getCurrentStudents() >= course.getMaxStudents()) {
            throw new RuntimeException("课程已满");
        }
        CourseSelection selection = new CourseSelection();
        selection.setStudent(student);
        selection.setCourse(course);
        course.setCurrentStudents(course.getCurrentStudents() + 1);
        courseRepository.save(course);
        return courseSelectionRepository.save(selection);
    }

    @Transactional
    public void dropCourse(Long userId, Long courseId) {
        Student student = getByUserId(userId);
        CourseSelection selection = courseSelectionRepository
                .findByStudentIdAndCourseId(student.getId(), courseId)
                .orElseThrow(() -> new RuntimeException("未选择该课程"));
        selection.setStatus("退选");
        Course course = selection.getCourse();
        course.setCurrentStudents(Math.max(0, course.getCurrentStudents() - 1));
        courseRepository.save(course);
        courseSelectionRepository.save(selection);
    }

    public List<CourseSelection> getMyCourses(Long userId) {
        Student student = getByUserId(userId);
        return courseSelectionRepository.findByStudentIdAndStatus(student.getId(), "已选");
    }

    public List<Grade> getMyGrades(Long userId) {
        Student student = getByUserId(userId);
        return gradeRepository.findByStudentId(student.getId());
    }

    public List<Grade> getMyGradesBySemester(Long userId, String semester) {
        Student student = getByUserId(userId);
        return gradeRepository.findByStudentIdAndSemester(student.getId(), semester);
    }

    @Transactional
    public Student updateContact(Long userId, String phone, String email) {
        Student student = getByUserId(userId);
        User user = student.getUser();
        if (phone != null) user.setPhone(phone);
        if (email != null) user.setEmail(email);
        return studentRepository.save(student);
    }
}
