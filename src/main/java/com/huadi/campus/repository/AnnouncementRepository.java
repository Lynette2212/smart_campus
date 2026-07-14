package com.huadi.campus.repository;

import com.huadi.campus.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByTypeOrderByTopDescPublishTimeDesc(String type);
    List<Announcement> findTop10ByOrderByTopDescPublishTimeDesc();
}
