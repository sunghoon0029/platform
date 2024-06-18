package com.project.platform.dto.request.auth;

import lombok.Getter;

@Getter
public class LoginRequest {

    private String email;
    private String password;
}
