package com.project.platform.service;

import com.project.platform.dto.request.UserRequest;
import com.project.platform.dto.response.UserResponse;
import com.project.platform.entity.User;
import com.project.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse save(UserRequest request) {
        User user = request.toEntity();

        User savedUser = userRepository.save(user);

        return UserResponse.toDTO(savedUser);
    }

    public UserResponse findByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("사용자 정보를 찾을 수 없습니다."));

        return UserResponse.toDTO(user);
    }

    public UserResponse update(String email, UserRequest request) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("사용자 정보를 찾을 수 없습니다."));

        user.update(request);
        userRepository.save(user);

        return UserResponse.toDTO(user);
    }

    @Transactional
    public void delete(String email) {
        userRepository.deleteByEmail(email);
    }
}
