package com.project.platform.dto.response.product_category;

import com.project.platform.entity.ProductCategory;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductCategoryResponse {

    private Long id;
    private String name;

    public static ProductCategoryResponse toDTO(ProductCategory productCategory) {
        return ProductCategoryResponse.builder()
                .id(productCategory.getId())
                .name(productCategory.getName())
                .build();
    }
}
