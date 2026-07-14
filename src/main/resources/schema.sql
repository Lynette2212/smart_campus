-- ========================================
-- 智慧校园服务平台 - H2兼容建表脚本
-- (JPA ddl-auto=update 也会自动建表，此脚本作为补充)
-- ========================================

-- 用户表
CREATE TABLE IF NOT EXISTS sys_user (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    real_name VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(100),
    gender VARCHAR(20),
    avatar VARCHAR(500),
    role VARCHAR(20) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    PRIMARY KEY (id)
);

-- 学生表
CREATE TABLE IF NOT EXISTS student (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    student_no VARCHAR(20) UNIQUE,
    department VARCHAR(100),
    major VARCHAR(100),
    class_name VARCHAR(50),
    enrollment_year VARCHAR(20),
    status VARCHAR(20),
    dormitory VARCHAR(100),
    total_credits DOUBLE,
    card_balance DOUBLE,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES sys_user(id)
);

-- 教师表
CREATE TABLE IF NOT EXISTS teacher (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    teacher_no VARCHAR(20) UNIQUE,
    department VARCHAR(100),
    title VARCHAR(100),
    research_area VARCHAR(100),
    teacher_type VARCHAR(50),
    office VARCHAR(100),
    political_status VARCHAR(50),
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES sys_user(id)
);

-- 课程表
CREATE TABLE IF NOT EXISTS course (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20),
    credits DOUBLE,
    hours INT,
    type VARCHAR(50),
    description VARCHAR(200),
    teacher_id BIGINT,
    semester VARCHAR(50),
    schedule VARCHAR(100),
    classroom VARCHAR(100),
    max_students INT,
    current_students INT,
    create_time TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);

-- 选课表
CREATE TABLE IF NOT EXISTS course_selection (
    id BIGINT NOT NULL AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    status VARCHAR(20),
    create_time TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_student_course (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

-- 成绩表
CREATE TABLE IF NOT EXISTS grade (
    id BIGINT NOT NULL AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    score DOUBLE,
    grade_level VARCHAR(20),
    credits DOUBLE,
    status VARCHAR(20),
    semester VARCHAR(50),
    create_time TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

-- 公告表
CREATE TABLE IF NOT EXISTS announcement (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    type VARCHAR(50),
    publisher_id BIGINT,
    top BOOLEAN DEFAULT FALSE,
    publish_time TIMESTAMP,
    create_time TIMESTAMP,
    PRIMARY KEY (id)
);

-- 新闻表
CREATE TABLE IF NOT EXISTS news (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    cover_image VARCHAR(500),
    category VARCHAR(50),
    author_id BIGINT,
    view_count INT DEFAULT 0,
    publish_time TIMESTAMP,
    create_time TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES sys_user(id)
);
