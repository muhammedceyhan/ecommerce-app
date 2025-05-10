package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductId(Long productId);
    List<Review> findByUserId(Long userId);

    Optional<Review> findByUserIdAndProductIdAndOrderId(Long userId, Long productId, Long orderId);
    long countByProductId(Long productId);  // ✅ Bunu kullan

}
