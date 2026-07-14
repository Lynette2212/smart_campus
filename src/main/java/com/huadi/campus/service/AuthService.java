package com.huadi.campus.service;

import com.huadi.campus.common.UserRole;
import com.huadi.campus.dto.request.LoginRequest;
import com.huadi.campus.dto.request.RegisterRequest;
import com.huadi.campus.dto.response.AuthResponse;
import com.huadi.campus.entity.*;
import com.huadi.campus.repository.*;
import com.huadi.campus.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, StudentRepository studentRepository,
                       TeacherRepository teacherRepository, PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        if (!user.getEnabled()) {
            throw new RuntimeException("账号已被禁用");
        }
        String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole().name());
        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .realName(user.getRealName())
                .role(user.getRole().name())
                .build();
    }

    @Transactional
    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("用户名已存在");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRealName(request.getRealName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        user.setRole(request.getRole());
        user = userRepository.save(user);

        if (request.getRole() == UserRole.STUDENT) {
            Student student = new Student();
            student.setUser(user);
            student.setStudentNo(request.getStudentNo());
            student.setDepartment(request.getDepartment());
            student.setMajor(request.getMajor());
            student.setClassName(request.getClassName());
            student.setEnrollmentYear(request.getEnrollmentYear());
            studentRepository.save(student);
        } else if (request.getRole() == UserRole.TEACHER) {
            Teacher teacher = new Teacher();
            teacher.setUser(user);
            teacher.setTeacherNo(request.getTeacherNo());
            teacher.setDepartment(request.getDepartment());
            teacher.setTitle(request.getTitle());
            teacher.setTeacherType(request.getTeacherType());
            teacherRepository.save(teacher);
        }
        return user;
    }
}
