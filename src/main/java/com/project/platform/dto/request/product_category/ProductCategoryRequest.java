package com.project.platform.dto.request.product_category;

import com.project.platform.entity.ProductCategory;
import lombok.Getter;

@Getter
public class ProductCategoryRequest {

    private String name;

    public ProductCategory toEntity() {
        return ProductCategory.builder()
                .name(name)
                .build();
    }
}
