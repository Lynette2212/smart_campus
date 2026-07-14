package com.huadi.campus.service;

import com.huadi.campus.entity.*;
import com.huadi.campus.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final CourseSelectionRepository courseSelectionRepository;
    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;

    public TeacherService(TeacherRepository teacherRepository, CourseRepository courseRepository,
                          CourseSelectionRepository courseSelectionRepository,
                          GradeRepository gradeRepository, StudentRepository studentRepository) {
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
        this.courseSelectionRepository = courseSelectionRepository;
        this.gradeRepository = gradeRepository;
        this.studentRepository = studentRepository;
    }

    public Teacher getByUserId(Long userId) {
        return teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("教师信息不存在"));
    }

    public List<Course> getMyCourses(Long userId) {
        Teacher teacher = getByUserId(userId);
        return courseRepository.findByTeacherId(teacher.getId());
    }

    public List<CourseSelection> getCourseStudents(Long courseId) {
        return courseSelectionRepository.findByCourseIdAndStatus(courseId, "已选");
    }

    @Transactional
    public Grade saveGrade(Long courseId, Long studentId, Double score, String semester) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("学生不存在"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("课程不存在"));

        Grade grade = new Grade();
        grade.setStudent(student);
        grade.setCourse(course);
        grade.setScore(score);
        grade.setSemester(semester);
        grade.setCredits(course.getCredits());

        if (score >= 90) grade.setGradeLevel("优");
        else if (score >= 80) grade.setGradeLevel("良");
        else if (score >= 70) grade.setGradeLevel("中");
        else if (score >= 60) grade.setGradeLevel("及格");
        else grade.setGradeLevel("不及格");

        grade.setStatus("正常");
        return gradeRepository.save(grade);
    }

    public List<Grade> getCourseGrades(Long courseId) {
        return gradeRepository.findByCourseId(courseId);
    }

    @Transactional
    public Teacher updateContact(Long userId, String phone, String email) {
        Teacher teacher = getByUserId(userId);
        User user = teacher.getUser();
        if (phone != null) user.setPhone(phone);
        if (email != null) user.setEmail(email);
        return teacherRepository.save(teacher);
    }
}
