package com.huadi.campus.repository;

import com.huadi.campus.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByTeacherNo(String teacherNo);
    Optional<Teacher> findByUserId(Long userId);
    List<Teacher> findByDepartment(String department);
    List<Teacher> findByTeacherType(String teacherType);
}
