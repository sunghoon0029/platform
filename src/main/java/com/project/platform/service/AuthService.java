package com.project.platform.service;

import com.project.platform.dto.request.auth.LoginRequest;
import com.project.platform.dto.response.auth.LoginResponse;
import com.project.platform.entity.User;
import com.project.platform.repository.UserRepository;
import com.project.platform.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        return LoginResponse.builder()
                .accessToken(jwtProvider.generateToken(user.getEmail()))
                .build();
    }
}
