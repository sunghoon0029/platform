package com.project.platform.dto.response.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
}
