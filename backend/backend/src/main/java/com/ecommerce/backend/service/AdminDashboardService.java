package com.ecommerce.backend.service;

import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public int getTotalUsers() {
        return (int) userRepository.count();
    }

    public int getTotalProducts() {
        return (int) productRepository.count();
    }

    public int getTotalOrders() {
        return (int) orderRepository.count();
    }
}
