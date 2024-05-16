package com.project.platform.repository;

import com.project.platform.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Optional<ProductCategory> findByName(String name);
    Optional<ProductCategory> deleteByName(String name);
}
