package com.project.platform.service;

import com.project.platform.dto.request.product_category.ProductCategoryRequest;
import com.project.platform.dto.response.product_category.ProductCategoryResponse;
import com.project.platform.entity.ProductCategory;
import com.project.platform.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryResponse save(ProductCategoryRequest request) {
        ProductCategory category = request.toEntity();

        ProductCategory savedCategory = productCategoryRepository.save(category);

        return ProductCategoryResponse.toDTO(savedCategory);
    }

    public ProductCategoryResponse findByName(String name) throws Exception {
        ProductCategory category = productCategoryRepository.findByName(name)
                .orElseThrow(() -> new Exception("카테고리를 찾을 수 없습니다."));

        return ProductCategoryResponse.toDTO(category);
    }

    public List<ProductCategoryResponse> findAll() {
        List<ProductCategory> categoryList = productCategoryRepository.findAll();
        List<ProductCategoryResponse> categoryResponseList = new ArrayList<>();

        for (ProductCategory category: categoryList) {
            categoryResponseList.add(ProductCategoryResponse.toDTO(category));
        }

        return categoryResponseList;
    }

    public ProductCategoryResponse update(String name, ProductCategoryRequest request) throws Exception {
        ProductCategory category = productCategoryRepository.findByName(name)
                .orElseThrow(() -> new Exception("카테고리를 찾을 수 없습니다."));

        category.update(request);
        ProductCategory savedCategory = productCategoryRepository.save(category);

        return ProductCategoryResponse.toDTO(savedCategory);
    }

    @Transactional
    public void delete(String name) {
        productCategoryRepository.deleteByName(name);
    }
}
