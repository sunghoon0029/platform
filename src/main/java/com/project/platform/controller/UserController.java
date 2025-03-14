package com.project.platform.controller;

import com.project.platform.dto.request.user.UserRequest;
import com.project.platform.dto.response.user.UserResponse;
import com.project.platform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.signup(request));
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserResponse> findByEmail(@PathVariable String email) throws Exception {
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> profile(Authentication authentication) throws Exception {
        return ResponseEntity.ok(userService.profile(authentication));
    }

    @PutMapping("/{email}")
    public ResponseEntity<UserResponse> update(@PathVariable String email, @RequestBody UserRequest request) throws Exception {
        return ResponseEntity.ok(userService.update(email, request));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<String> delete(@PathVariable String email) {
        userService.delete(email);
        return ResponseEntity.ok("사용자 삭제 완료");
    }
}
