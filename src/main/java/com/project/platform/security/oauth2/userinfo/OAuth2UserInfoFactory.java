package com.project.platform.security.oauth2.userinfo;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {

        if ("naver".equalsIgnoreCase(registrationId)) {
            return new NaverUserInfo(attributes);
        } else if ("kakao".equalsIgnoreCase(registrationId)) {
            return new KakaoUserInfo(attributes);
        } else {
            throw new IllegalArgumentException("지원하지 않는 로그인 서비스 입니다.");
        }
    }
}
