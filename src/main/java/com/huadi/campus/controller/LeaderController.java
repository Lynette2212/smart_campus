package com.huadi.campus.controller;

import com.huadi.campus.common.Result;
import com.huadi.campus.entity.*;
import com.huadi.campus.service.LeaderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leader")
public class LeaderController {

    private final LeaderService leaderService;

    public LeaderController(LeaderService leaderService) {
        this.leaderService = leaderService;
    }

    @GetMapping("/statistics/students")
    public Result<Map<String, Object>> getStudentStatistics() {
        return Result.success(leaderService.getStudentStatistics());
    }

    @GetMapping("/statistics/teachers")
    public Result<Map<String, Object>> getTeacherStatistics() {
        return Result.success(leaderService.getTeacherStatistics());
    }

    @GetMapping("/statistics/courses")
    public Result<Map<String, Object>> getCourseSelectionStatistics() {
        return Result.success(leaderService.getCourseSelectionStatistics());
    }

    @GetMapping("/students")
    public Result<List<Student>> getAllStudents() {
        return Result.success(leaderService.getAllStudents());
    }

    @GetMapping("/teachers")
    public Result<List<Teacher>> getAllTeachers() {
        return Result.success(leaderService.getAllTeachers());
    }
}
