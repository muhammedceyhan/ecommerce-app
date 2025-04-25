package com.ecommerce.backend.controller;

import java.util.List;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    
}
