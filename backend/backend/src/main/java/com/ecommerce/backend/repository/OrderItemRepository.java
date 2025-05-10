package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // OrderItemRepository.java dosyasına EKLE
    long countByProductId(Long productId); // ✅ Burada doğru yer

}
