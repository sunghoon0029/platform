package com.project.platform.service;

import com.project.platform.dto.request.product.ProductRequest;
import com.project.platform.dto.response.product.ProductResponse;
import com.project.platform.entity.Product;
import com.project.platform.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductResponse save(ProductRequest request) {
        Product product = request.toEntity();

        Product savedProduct = productRepository.save(product);

        return ProductResponse.toDTO(savedProduct);
    }

    public ProductResponse findByName(String name) throws Exception {
        Product product = productRepository.findByName(name)
                .orElseThrow(() -> new Exception("상품 정보를 찾을 수 없습니다."));

        return ProductResponse.toDTO(product);
    }

    public ProductResponse update(String name, ProductRequest request) throws Exception {
        Product product = productRepository.findByName(name)
                .orElseThrow(() -> new Exception("상품 정보를 찾을 수 없습니다."));

        product.update(request);
        productRepository.save(product);

        return ProductResponse.toDTO(product);
    }

    @Transactional
    public void delete(String name) {
        productRepository.deleteByName(name);
    }
}
