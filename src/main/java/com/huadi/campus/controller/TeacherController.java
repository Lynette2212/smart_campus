package com.huadi.campus.controller;

import com.huadi.campus.common.Result;
import com.huadi.campus.entity.*;
import com.huadi.campus.service.TeacherService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/profile")
    public Result<Teacher> getProfile(@AuthenticationPrincipal User user) {
        return Result.success(teacherService.getByUserId(user.getId()));
    }

    @PutMapping("/contact")
    public Result<Teacher> updateContact(@AuthenticationPrincipal User user,
                                         @RequestParam(required = false) String phone,
                                         @RequestParam(required = false) String email) {
        return Result.success(teacherService.updateContact(user.getId(), phone, email));
    }

    @GetMapping("/courses")
    public Result<List<Course>> getMyCourses(@AuthenticationPrincipal User user) {
        return Result.success(teacherService.getMyCourses(user.getId()));
    }

    @GetMapping("/courses/{courseId}/students")
    public Result<List<CourseSelection>> getCourseStudents(@PathVariable Long courseId) {
        return Result.success(teacherService.getCourseStudents(courseId));
    }

    @PostMapping("/courses/{courseId}/grades")
    public Result<Grade> saveGrade(@PathVariable Long courseId,
                                   @RequestParam Long studentId,
                                   @RequestParam Double score,
                                   @RequestParam String semester) {
        return Result.success(teacherService.saveGrade(courseId, studentId, score, semester));
    }

    @GetMapping("/courses/{courseId}/grades")
    public Result<List<Grade>> getCourseGrades(@PathVariable Long courseId) {
        return Result.success(teacherService.getCourseGrades(courseId));
    }
}
