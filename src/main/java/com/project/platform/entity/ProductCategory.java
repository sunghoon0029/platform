package com.project.platform.entity;

import com.project.platform.dto.request.product_category.ProductCategoryRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product_category")
public class ProductCategory extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Builder.Default
    private List<Product> products = new ArrayList<>();

    public void update(ProductCategoryRequest request) {
        this.name = request.getName();
    }
}
