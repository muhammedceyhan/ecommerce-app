package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySellerId(Long sellerId);  // Seller'ın ürünlerini getirmek için
    
    List<Product> findByCategory(String category);  // Kategorilere göre arama için (opsiyonel)

    List<Product> findByInCartNumberGreaterThan(int number);
}
