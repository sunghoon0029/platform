package com.project.platform.controller;

import com.project.platform.dto.request.product_category.ProductCategoryRequest;
import com.project.platform.dto.response.product_category.ProductCategoryResponse;
import com.project.platform.service.ProductCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product-category")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    @PostMapping("/save")
    public ResponseEntity<ProductCategoryResponse> save(@RequestBody ProductCategoryRequest request) {
        return ResponseEntity.ok(productCategoryService.save(request));
    }

    @GetMapping("/")
    public ResponseEntity<List<ProductCategoryResponse>> findAll() {
        return ResponseEntity.ok(productCategoryService.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<ProductCategoryResponse> findByName(@PathVariable String name) throws Exception {
        return ResponseEntity.ok(productCategoryService.findByName(name));
    }

    @PutMapping("/{name}")
    public ResponseEntity<ProductCategoryResponse> update(@PathVariable String name, @RequestBody ProductCategoryRequest request) throws Exception {
        return ResponseEntity.ok(productCategoryService.update(name, request));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> delete(@PathVariable String name) {
        productCategoryService.delete(name);
        return ResponseEntity.ok("카테고리 삭제 완료.");
    }
}
