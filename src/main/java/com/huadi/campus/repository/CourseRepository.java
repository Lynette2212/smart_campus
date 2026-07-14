package com.huadi.campus.repository;

import com.huadi.campus.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findBySemester(String semester);
    List<Course> findByTeacherId(Long teacherId);
    List<Course> findByNameContaining(String name);
}
