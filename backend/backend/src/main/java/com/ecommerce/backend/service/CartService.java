package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
interface CartRepository extends JpaRepository<Product, Long> {
    List<Product> findByInCartNumberGreaterThan(int number);
}

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public List<Product> getAllProducts() {
        return cartRepository.findAll();
    }

    public Product addProduct(Product product) {
        return cartRepository.save(product);
    }
    public Product getProductById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }
    public Product updateProduct(Product product) {
        return cartRepository.save(product);
    }
    public List<Product> getProductsInCart() {
        return cartRepository.findByInCartNumberGreaterThan(0);
    }
}