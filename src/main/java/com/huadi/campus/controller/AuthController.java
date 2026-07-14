package com.huadi.campus.controller;

import com.huadi.campus.common.Result;
import com.huadi.campus.dto.request.LoginRequest;
import com.huadi.campus.dto.request.RegisterRequest;
import com.huadi.campus.dto.response.AuthResponse;
import com.huadi.campus.entity.User;
import com.huadi.campus.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public Result<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return Result.success(authService.login(request));
    }

    @PostMapping("/register")
    public Result<User> register(@Valid @RequestBody RegisterRequest request) {
        return Result.success(authService.register(request));
    }
}
