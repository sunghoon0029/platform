package com.project.platform.entity;

import com.project.platform.dto.request.product.ProductRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product")
public class Product extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private int price;

    @Column
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id")
    private ProductCategory category;

    public void addCategory(ProductCategory category) {
        this.category = category;
        category.getProducts().add(this);
    }

    public void update(ProductRequest request) {
        this.name = request.getName();
        this.price = request.getPrice();
        this.quantity = request.getQuantity();
    }
}
