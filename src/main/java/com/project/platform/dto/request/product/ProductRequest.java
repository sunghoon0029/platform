package com.project.platform.dto.request.product;

import com.project.platform.entity.Product;
import lombok.Getter;

@Getter
public class ProductRequest {

    private String name;
    private int price;
    private int quantity;

    public Product toEntity() {
        return Product.builder()
                .name(name)
                .price(price)
                .quantity(quantity)
                .build();
    }
}
