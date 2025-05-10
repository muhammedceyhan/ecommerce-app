package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Review;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Review addReview(Review review) {
        Order order = orderRepository.findById(review.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getStatus().equalsIgnoreCase("DELIVERED")) {
            throw new RuntimeException("Cannot review before delivery.");
        }

        boolean alreadyReviewed = reviewRepository
                .findByUserIdAndProductIdAndOrderId(review.getUserId(), review.getProductId(), review.getOrderId())
                .isPresent();
        if (alreadyReviewed) {
            throw new RuntimeException("You already reviewed this product in this order.");
        }

        review.setCommentDate(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }
}
