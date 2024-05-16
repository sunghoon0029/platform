package com.project.platform.dto.response.product;

import com.project.platform.entity.Product;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private int price;
    private int quantity;

    public static ProductResponse toDTO(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .build();
    }
}
