-- ========================================
-- 智慧校园服务平台 - 测试数据初始化 (H2兼容)
-- 使用 MERGE INTO 实现 INSERT IF NOT EXISTS 语义
-- ========================================

-- 用户表 (密码均为: 123456, BCrypt加密)
MERGE INTO sys_user (id, username, password, real_name, phone, email, gender, role, enabled, create_time, update_time) KEY(username) VALUES
    (1, 'admin', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '系统管理员', '13800000000', 'admin@campus.edu.cn', '男', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'student1', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '张三', '13800000001', 'zhangsan@campus.edu.cn', '男', 'STUDENT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'student2', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '李四', '13800000002', 'lisi@campus.edu.cn', '女', 'STUDENT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'student3', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '王五', '13800000003', 'wangwu@campus.edu.cn', '男', 'STUDENT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'student4', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '赵六', '13800000004', 'zhaoliu@campus.edu.cn', '女', 'STUDENT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'teacher1', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '刘老师', '13800000010', 'liulaoshi@campus.edu.cn', '男', 'TEACHER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'teacher2', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '陈老师', '13800000011', 'chenlaoshi@campus.edu.cn', '女', 'TEACHER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'teacher3', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '王老师', '13800000012', 'wanglaoshi@campus.edu.cn', '男', 'TEACHER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 'leader1', '$2a$10$HcACZj.YryW0BDfFqthSP.tUniIABlLK4Vgex2gi.kPONMKqnVC3y', '李院长', '13800000020', 'liyuanzhang@campus.edu.cn', '男', 'LEADER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 学生表
MERGE INTO student (id, user_id, student_no, department, major, class_name, enrollment_year, status, dormitory, total_credits, card_balance, create_time, update_time) KEY(student_no) VALUES
    (1, 2, '2023001', '计算机科学与技术学院', '软件工程', '软工2301班', '2023', '在读', '12号楼301', 45.0, 350.50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 3, '2023002', '计算机科学与技术学院', '计算机科学与技术', '计科2301班', '2023', '在读', '12号楼302', 42.0, 280.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 4, '2023003', '数学与统计学院', '应用数学', '应数2301班', '2023', '在读', '8号楼201', 40.0, 150.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 5, '2023004', '计算机科学与技术学院', '软件工程', '软工2301班', '2023', '在读', '12号楼303', 38.0, 520.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 教师表
MERGE INTO teacher (id, user_id, teacher_no, department, title, research_area, teacher_type, office, political_status, create_time, update_time) KEY(teacher_no) VALUES
    (1, 6, 'T2010001', '计算机科学与技术学院', '教授', '人工智能与机器学习', '专职', '科教楼A501', '中共党员', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 7, 'T2010002', '计算机科学与技术学院', '副教授', '软件工程与大数据', '专职', '科教楼A502', '中共党员', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 8, 'T2010003', '数学与统计学院', '讲师', '应用数学与数据分析', '专职', '理学楼B301', '群众', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 课程表
MERGE INTO course (id, name, code, credits, hours, type, description, teacher_id, semester, schedule, classroom, max_students, current_students, create_time) KEY(code) VALUES
    (1, 'Java程序设计', 'CS101', 4.0, 64, '必修', 'Java编程语言基础与高级特性', 1, '2025-2026-1', '周一3-4节,周三3-4节', '科教楼A101', 60, 3, CURRENT_TIMESTAMP),
    (2, '数据库原理', 'CS201', 3.0, 48, '必修', '关系数据库理论与SQL实践', 1, '2025-2026-1', '周二1-2节,周四1-2节', '科教楼A102', 50, 2, CURRENT_TIMESTAMP),
    (3, '软件工程', 'CS301', 3.0, 48, '必修', '软件开发方法论与项目管理', 2, '2025-2026-1', '周一5-6节,周三5-6节', '科教楼A201', 45, 2, CURRENT_TIMESTAMP),
    (4, '高等数学', 'MA101', 5.0, 80, '必修', '微积分与线性代数基础', 3, '2025-2026-1', '周一1-2节,周三1-2节,周五1-2节', '理学楼B101', 80, 1, CURRENT_TIMESTAMP),
    (5, 'Web前端开发', 'CS401', 2.0, 32, '选修', 'HTML/CSS/JavaScript与React框架', 2, '2025-2026-1', '周四5-6节', '科教楼A301', 40, 0, CURRENT_TIMESTAMP),
    (6, '操作系统', 'CS501', 3.0, 48, '必修', '操作系统原理与Linux实践', 1, '2025-2026-2', '待定', '待定', 60, 0, CURRENT_TIMESTAMP),
    (7, '计算机网络', 'CS601', 3.0, 48, '必修', '网络协议与网络安全', 2, '2025-2026-2', '待定', '待定', 50, 0, CURRENT_TIMESTAMP);

-- 选课表
MERGE INTO course_selection (id, student_id, course_id, status, create_time) KEY(student_id, course_id) VALUES
    (1, 1, 1, '已选', CURRENT_TIMESTAMP),
    (2, 1, 2, '已选', CURRENT_TIMESTAMP),
    (3, 1, 3, '已选', CURRENT_TIMESTAMP),
    (4, 2, 1, '已选', CURRENT_TIMESTAMP),
    (5, 2, 4, '已选', CURRENT_TIMESTAMP),
    (6, 3, 1, '已选', CURRENT_TIMESTAMP),
    (7, 3, 2, '已选', CURRENT_TIMESTAMP);

-- 成绩表
MERGE INTO grade (id, student_id, course_id, score, grade_level, credits, status, semester, create_time) KEY(student_id, course_id, semester) VALUES
    (1, 1, 1, 92.0, '优', 4.0, '正常', '2024-2025-2', CURRENT_TIMESTAMP),
    (2, 1, 2, 85.0, '良', 3.0, '正常', '2024-2025-2', CURRENT_TIMESTAMP),
    (3, 2, 1, 78.0, '中', 4.0, '正常', '2024-2025-2', CURRENT_TIMESTAMP),
    (4, 2, 4, 95.0, '优', 5.0, '正常', '2024-2025-2', CURRENT_TIMESTAMP),
    (5, 3, 1, 62.0, '及格', 4.0, '正常', '2024-2025-2', CURRENT_TIMESTAMP),
    (6, 3, 2, 55.0, '不及格', 3.0, '补考', '2024-2025-2', CURRENT_TIMESTAMP),
    (7, 4, 1, 88.0, '良', 4.0, '正常', '2024-2025-2', CURRENT_TIMESTAMP);

-- 公告表
MERGE INTO announcement (id, title, content, type, publisher_id, top, publish_time, create_time) KEY(title) VALUES
    (1, '关于2025-2026学年第一学期选课通知', '各位同学：

本学期网上选课工作将于2025年8月25日开始，请同学们按时登录系统进行选课操作。选课分为两个阶段：
第一阶段：8月25日-8月30日，初选阶段
第二阶段：9月1日-9月5日，补退选阶段

请各位同学合理安排选课时间，逾期不再补选。', '学校公告', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '计算机学院关于开展毕业设计选题的通知', '各位大四同学：

2026届毕业设计（论文）选题工作即将开始，请各位同学仔细阅读各指导教师公布的课题，结合自身兴趣进行选择。选题时间为2025年9月10日-9月20日。', '院系公告', 1, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, '关于举办第十二届大学生程序设计竞赛的通知', '为提升我校学生的程序设计能力，学校决定举办第十二届大学生程序设计竞赛。比赛时间为2025年10月15日，欢迎全校同学积极报名参加。', '学校公告', 1, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, '图书馆国庆假期开放时间安排', '国庆假期（10月1日-10月7日）图书馆开放时间为每日9:00-17:00，请同学们合理安排学习时间。', '学校公告', 1, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 新闻表
MERGE INTO news (id, title, content, cover_image, category, author_id, view_count, publish_time, create_time) KEY(title) VALUES
    (1, '我校在2025年全国大学生数学建模竞赛中荣获一等奖', '在刚刚结束的2025年全国大学生数学建模竞赛中，我校计算机科学与技术学院和数学与统计学院联合组队参赛，经过三天三夜的激烈角逐，最终荣获全国一等奖。这是我校连续第五年在该项赛事中获得优异成绩。', NULL, '校内新闻', 1, 156, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '智慧校园建设项目正式启动', '为推进教育信息化建设，我校正式启动智慧校园建设项目。该项目将整合学校各业务系统，建设统一的信息化基础支撑平台，为师生提供便捷的校园服务。', NULL, '校内新闻', 1, 230, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, '计算机学院与华为公司签署产学研合作协议', '计算机科学与技术学院与华为技术有限公司正式签署产学研合作协议，双方将在人工智能、大数据等领域开展深入合作，共建联合实验室，培养高素质IT人才。', NULL, '学术动态', 1, 89, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, '2025年秋季学期开学典礼隆重举行', '9月1日上午，我校2025年秋季学期开学典礼在学校大礼堂隆重举行。校长在致辞中勉励全体师生砥砺前行，共创辉煌。', NULL, '校内新闻', 1, 312, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
