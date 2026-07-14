package com.huadi.campus.service;

import com.huadi.campus.entity.*;
import com.huadi.campus.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonService {

    private final AnnouncementRepository announcementRepository;
    private final NewsRepository newsRepository;
    private final CourseRepository courseRepository;

    public CommonService(AnnouncementRepository announcementRepository,
                         NewsRepository newsRepository, CourseRepository courseRepository) {
        this.announcementRepository = announcementRepository;
        this.newsRepository = newsRepository;
        this.courseRepository = courseRepository;
    }

    public List<Announcement> getLatestAnnouncements() {
        return announcementRepository.findTop10ByOrderByTopDescPublishTimeDesc();
    }

    public List<Announcement> getAnnouncementsByType(String type) {
        return announcementRepository.findByTypeOrderByTopDescPublishTimeDesc(type);
    }

    public Announcement getAnnouncement(Long id) {
        return announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("公告不存在"));
    }

    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public List<News> getLatestNews() {
        return newsRepository.findTop10ByOrderByPublishTimeDesc();
    }

    public List<News> getNewsByCategory(String category) {
        return newsRepository.findByCategoryOrderByPublishTimeDesc(category);
    }

    public News getNews(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("新闻不存在"));
        news.setViewCount(news.getViewCount() + 1);
        return newsRepository.save(news);
    }

    public News createNews(News news) {
        return newsRepository.save(news);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesBySemester(String semester) {
        return courseRepository.findBySemester(semester);
    }

    public Course getCourse(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("课程不存在"));
    }

    public List<Course> searchCourses(String keyword) {
        return courseRepository.findByNameContaining(keyword);
    }
}
