package com.project.platform.controller;

import com.project.platform.dto.request.auth.LoginRequest;
import com.project.platform.dto.request.auth.LogoutRequest;
import com.project.platform.dto.request.auth.ReissueRequest;
import com.project.platform.security.jwt.Token;
import com.project.platform.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/reissue")
    public ResponseEntity<Token> reissue(@RequestBody ReissueRequest request) {
        return ResponseEntity.ok(authService.reissue(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LogoutRequest request) {
        authService.logout(request);
        return ResponseEntity.ok("로그아웃 완료");
    }
}
