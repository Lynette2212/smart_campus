package com.huadi.campus.repository;

import com.huadi.campus.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudentId(Long studentId);
    List<Grade> findByStudentIdAndSemester(Long studentId, String semester);
    List<Grade> findByCourseId(Long courseId);
}
