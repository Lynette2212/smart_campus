package com.huadi.campus.repository;

import com.huadi.campus.entity.CourseSelection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CourseSelectionRepository extends JpaRepository<CourseSelection, Long> {
    List<CourseSelection> findByStudentIdAndStatus(Long studentId, String status);
    Optional<CourseSelection> findByStudentIdAndCourseId(Long studentId, Long courseId);
    List<CourseSelection> findByCourseIdAndStatus(Long courseId, String status);
}
