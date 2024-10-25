package com.project.platform.service;

import com.project.platform.dto.request.user.UserRequest;
import com.project.platform.dto.response.user.UserResponse;
import com.project.platform.entity.Role;
import com.project.platform.entity.User;
import com.project.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse signup(UserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용중인 이메일 입니다.");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .build();
    }

    public UserResponse findByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("사용자 정보를 찾을 수 없습니다."));

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public UserResponse profile(Authentication authentication) throws Exception {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("사용자 정보를 찾을 수 없습니다."));

        return UserResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    public UserResponse update(String email, UserRequest request) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("사용자 정보를 찾을 수 없습니다."));

        if (StringUtils.hasText(request.getName())) {
            user.updateName(request.getName());
        }

        if (StringUtils.hasText(request.getPassword())) {
            user.updatePassword(passwordEncoder.encode(request.getPassword()));
        }

        User updatedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(updatedUser.getId())
                .name(updatedUser.getName())
                .email(updatedUser.getEmail())
                .role(updatedUser.getRole().name())
                .build();
    }

    @Transactional
    public void delete(String email) {
        userRepository.deleteByEmail(email);
    }
}
