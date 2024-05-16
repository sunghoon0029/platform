package com.project.platform.dto.request.user;

import com.project.platform.entity.User;
import lombok.Getter;

@Getter
public class UserRequest {

    private String name;
    private String email;
    private String password;

    public User toEntity() {
        return User.builder()
                .name(name)
                .email(email)
                .password(password)
                .build();
    }
}
