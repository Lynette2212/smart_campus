package com.huadi.campus.repository;

import com.huadi.campus.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByCategoryOrderByPublishTimeDesc(String category);
    List<News> findTop10ByOrderByPublishTimeDesc();
    List<News> findByTitleContaining(String keyword);
}
