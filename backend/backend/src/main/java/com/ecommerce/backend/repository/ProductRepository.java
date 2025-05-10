package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.model.Product;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySellerId(Long sellerId);  // Seller'ın ürünlerini getirmek için
    
    List<Product> findByCategory(Category category);  // Kategorilere göre arama için (opsiyonel)

    List<Product> findByInCartNumberGreaterThan(int number);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.id = :productId")
    Optional<Product> findByIdForUpdate(@Param("productId") Long productId);

    

    
}
