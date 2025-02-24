package com.project.platform.repository;

import com.project.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> deleteByEmail(String email);
    public User findByProviderAndProviderId(String provider, String providerId);
}
