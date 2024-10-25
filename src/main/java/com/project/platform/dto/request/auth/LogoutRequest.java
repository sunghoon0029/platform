package com.project.platform.dto.request.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class LogoutRequest {

    private String accessToken;
    private String refreshToken;
}
