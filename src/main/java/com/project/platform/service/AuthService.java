package com.project.platform.service;

import com.project.platform.dto.request.auth.LoginRequest;
import com.project.platform.dto.request.auth.ReissueRequest;
import com.project.platform.entity.User;
import com.project.platform.repository.RefreshTokenRepository;
import com.project.platform.repository.UserRepository;
import com.project.platform.security.jwt.JwtProvider;
import com.project.platform.security.jwt.RefreshToken;
import com.project.platform.security.jwt.Token;
import com.project.platform.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RedisUtil redisUtil;

    public Token login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        String accessToken = jwtProvider.generateAccessToken(user.getEmail(), user.getRole().name());
        String refreshToken = jwtProvider.generateRefreshToken();

        refreshTokenRepository.save(new RefreshToken(refreshToken, user.getId()));

        return Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Token reissue(ReissueRequest request) {
        if (!jwtProvider.validateToken(request.getRefreshToken())) {
            throw new IllegalArgumentException("유효하지 않은 인증정보 입니다.");
        }

        RefreshToken refreshToken = refreshTokenRepository.findById(request.getRefreshToken())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 인증정보 입니다."));

        User user = userRepository.findById(refreshToken.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        String newAccessToken = jwtProvider.generateAccessToken(user.getEmail(), user.getRole().name());
        String newRefreshToken = jwtProvider.generateRefreshToken();

        refreshTokenRepository.delete(refreshToken);
        refreshTokenRepository.save(new RefreshToken(newRefreshToken, user.getId()));

        return Token.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    public void logout(Token token) {
        if (!jwtProvider.validateToken(token.getAccessToken())) {
            throw new IllegalArgumentException("유효하지 않은 인증정보 입니다.");
        }

        RefreshToken refreshToken = refreshTokenRepository.findById(token.getRefreshToken())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 인증정보 입니다."));
        refreshTokenRepository.delete(refreshToken);

        Long expiration = jwtProvider.getExpiration(token.getAccessToken());
        redisUtil.setBlackList(token.getAccessToken(), "logout", expiration);
    }
}
