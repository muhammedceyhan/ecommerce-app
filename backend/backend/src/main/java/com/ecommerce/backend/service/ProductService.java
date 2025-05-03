package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
    public List<Product> getProductsInCart() {
        return productRepository.findByInCartNumberGreaterThan(0);
    }


    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    

    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findBySellerId(userId);
    }

}