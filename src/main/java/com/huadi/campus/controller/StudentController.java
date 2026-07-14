package com.huadi.campus.controller;

import com.huadi.campus.common.Result;
import com.huadi.campus.entity.*;
import com.huadi.campus.service.StudentService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public Result<Student> getProfile(@AuthenticationPrincipal User user) {
        return Result.success(studentService.getByUserId(user.getId()));
    }

    @PutMapping("/contact")
    public Result<Student> updateContact(@AuthenticationPrincipal User user,
                                         @RequestParam(required = false) String phone,
                                         @RequestParam(required = false) String email) {
        return Result.success(studentService.updateContact(user.getId(), phone, email));
    }

    @GetMapping("/courses")
    public Result<List<CourseSelection>> getMyCourses(@AuthenticationPrincipal User user) {
        return Result.success(studentService.getMyCourses(user.getId()));
    }

    @PostMapping("/courses/{courseId}/select")
    public Result<CourseSelection> selectCourse(@AuthenticationPrincipal User user,
                                                @PathVariable Long courseId) {
        return Result.success(studentService.selectCourse(user.getId(), courseId));
    }

    @DeleteMapping("/courses/{courseId}/drop")
    public Result<Void> dropCourse(@AuthenticationPrincipal User user,
                                   @PathVariable Long courseId) {
        studentService.dropCourse(user.getId(), courseId);
        return Result.success();
    }

    @GetMapping("/grades")
    public Result<List<Grade>> getMyGrades(@AuthenticationPrincipal User user,
                                           @RequestParam(required = false) String semester) {
        if (semester != null)
            return Result.success(studentService.getMyGradesBySemester(user.getId(), semester));
        return Result.success(studentService.getMyGrades(user.getId()));
    }
}
