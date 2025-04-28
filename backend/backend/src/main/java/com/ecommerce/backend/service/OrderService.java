package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.OrderItem;
import com.ecommerce.backend.repository.OrderItemRepository;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    // 🔵 Sipariş oluştur
    public Order createOrder(Order order) {
        // Sipariş zamanı ayarlanıyor
        order.setPurchaseDate(LocalDateTime.now());
        order.setStatus("PREPARING"); // Başlangıçta "Hazırlanıyor" olarak başlasın
        
        // Order içindeki tüm OrderItem'ları kaydet
        for (OrderItem item : order.getItems()) {
            item.setOrder(order); // Her item'a bağlı sipariş atanıyor
        }

        // Önce sipariş kaydediliyor (Order + Items cascade ile birlikte kaydedilecek)
        return orderRepository.save(order);
    }

    // 🔵 Tüm siparişleri listele
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 🔵 Kullanıcıya özel siparişleri getir
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
