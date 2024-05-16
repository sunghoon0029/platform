package com.project.platform.controller;

import com.project.platform.dto.request.product.ProductRequest;
import com.project.platform.dto.response.product.ProductResponse;
import com.project.platform.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<ProductResponse> save(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.save(request));
    }

    @GetMapping("/{name}")
    public ResponseEntity<ProductResponse> findByName(@PathVariable String name) throws Exception {
        return ResponseEntity.ok(productService.findByName(name));
    }

    @PutMapping("/{name}")
    public ResponseEntity<ProductResponse> update(@PathVariable String name, @RequestBody ProductRequest request) throws Exception {
        return ResponseEntity.ok(productService.update(name, request));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> delete(@PathVariable String name) {
        productService.delete(name);
        return ResponseEntity.ok("상품 삭제 완료.");
    }
}
