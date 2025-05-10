package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.OrderItemRepository;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerDashboardService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public int getTotalProducts(Long sellerId) {
        return productRepository.findBySellerId(sellerId).size();
    }

    // public int getTotalOrders(Long sellerId) {
    //     List<Product> sellerProducts = productRepository.findBySellerId(sellerId);
    //     return (int) sellerProducts.stream()
    //             .mapToLong(product -> orderRepository.countByProductId(product.getId()))
    //             .sum();
    // }

    public int getTotalReviews(Long sellerId) {
        List<Product> sellerProducts = productRepository.findBySellerId(sellerId);
        return (int) sellerProducts.stream()
                .mapToLong(product -> reviewRepository.countByProductId(product.getId()))
                .sum();
    }

    public int getTotalOrders(Long sellerId) {
    List<Product> sellerProducts = productRepository.findBySellerId(sellerId);
    return (int) sellerProducts.stream()
            .mapToLong(product -> orderItemRepository.countByProductId(product.getId()))
            .sum();
    }
}
