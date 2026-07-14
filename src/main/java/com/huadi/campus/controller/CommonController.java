package com.huadi.campus.controller;

import com.huadi.campus.common.Result;
import com.huadi.campus.entity.*;
import com.huadi.campus.service.CommonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/common")
public class CommonController {

    private final CommonService commonService;

    public CommonController(CommonService commonService) {
        this.commonService = commonService;
    }

    @GetMapping("/announcements")
    public Result<List<Announcement>> getAnnouncements(@RequestParam(required = false) String type) {
        if (type != null) return Result.success(commonService.getAnnouncementsByType(type));
        return Result.success(commonService.getLatestAnnouncements());
    }

    @GetMapping("/announcements/{id}")
    public Result<Announcement> getAnnouncement(@PathVariable Long id) {
        return Result.success(commonService.getAnnouncement(id));
    }

    @PostMapping("/announcements")
    public Result<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        return Result.success(commonService.createAnnouncement(announcement));
    }

    @GetMapping("/news")
    public Result<List<News>> getNews(@RequestParam(required = false) String category) {
        if (category != null) return Result.success(commonService.getNewsByCategory(category));
        return Result.success(commonService.getLatestNews());
    }

    @GetMapping("/news/{id}")
    public Result<News> getNews(@PathVariable Long id) {
        return Result.success(commonService.getNews(id));
    }

    @PostMapping("/news")
    public Result<News> createNews(@RequestBody News news) {
        return Result.success(commonService.createNews(news));
    }

    @GetMapping("/courses")
    public Result<List<Course>> getCourses(@RequestParam(required = false) String semester,
                                           @RequestParam(required = false) String keyword) {
        if (keyword != null) return Result.success(commonService.searchCourses(keyword));
        if (semester != null) return Result.success(commonService.getCoursesBySemester(semester));
        return Result.success(commonService.getAllCourses());
    }

    @GetMapping("/courses/{id}")
    public Result<Course> getCourse(@PathVariable Long id) {
        return Result.success(commonService.getCourse(id));
    }
}
