package com.project.platform.config;

import com.project.platform.security.jwt.JwtAuthenticationFilter;
import com.project.platform.security.jwt.JwtProvider;
import com.project.platform.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtProvider jwtProvider;
    private final RedisUtil redisUtil;

    @Override
    public void configure(HttpSecurity http) {
        http.addFilterBefore(
                new JwtAuthenticationFilter(jwtProvider, redisUtil), UsernamePasswordAuthenticationFilter.class
        );
    }
}
