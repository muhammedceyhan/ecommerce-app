package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.CheckoutRequest;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.security.JwtUtil;
import com.ecommerce.backend.service.OrderService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;


    // 🔵 Sipariş oluştur
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    // 🔵 Tüm siparişleri getir
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // 🔵 Kullanıcının kendi siparişlerini listele
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }


    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    

    @PostMapping("/checkout")
public ResponseEntity<?> checkout(@RequestBody CheckoutRequest checkoutRequest, HttpServletRequest request) {
    String token = extractToken(request);
    if (token == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }
    Claims claims = jwtUtil.extractAllClaims(token);  // artık instance üzerinden çağırıyoruz
    Long userId = claims.get("id", Long.class);

    try {
        Order order = orderService.createOrderFromCart(userId, checkoutRequest);
        return ResponseEntity.ok(order);
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}

@PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
@PutMapping("/{orderId}/status")
public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
    try {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Order status updated successfully.");
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}


}
