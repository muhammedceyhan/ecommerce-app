package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Review;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType; // ← Doğru MediaType
import java.util.Collections; // ← Collections
import java.util.Map; // ← Map
import java.util.List;
import com.ecommerce.backend.model.Order; // ✅ senin kendi model sınıfın bu

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private OrderRepository orderRepository;

    // ReviewController.java
    // :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        try {
            Review saved = reviewService.addReview(review);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            // String yerine JSON objesi dönecek
            Map<String, String> err = Collections.singletonMap("message", e.getMessage());
            return ResponseEntity
                    .badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(err);
        }
    }

    // @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    // public ResponseEntity<?> deleteReview(@PathVariable Long id) {
    // reviewService.deleteReview(id);
    // return ResponseEntity.ok("Review deleted");
    // }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProductId(productId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER') or hasRole('SELLER')")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Review deleted");
    }

    @GetMapping("/can-review/{userId}/{productId}")
    public ResponseEntity<?> canUserReview(@PathVariable Long userId, @PathVariable Long productId) {
        List<Order> orders = orderRepository.findDeliveredOrdersWithProduct(userId, productId, "DELIVERED");
        if (orders.isEmpty()) {
            return ResponseEntity.ok(Collections.singletonMap("canReview", false));
        } else {
            Long validOrderId = orders.get(0).getId();
            return ResponseEntity.ok(Map.of("canReview", true, "orderId", validOrderId));
        }
    }
}
