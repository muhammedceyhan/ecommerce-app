package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.AdminOrderDTO;
import com.ecommerce.backend.dto.CheckoutRequest;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.OrderItem;
import com.ecommerce.backend.model.OrderResponse;
import com.ecommerce.backend.service.OrderService;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    // 🔵 Sipariş oluştur
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    // 🔵 Tüm siparişleri getir
    @GetMapping
    public ResponseEntity<List<AdminOrderDTO>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();

        List<AdminOrderDTO> dtoList = orders.stream().map(order -> {
            String email = "Unknown";
            if (order.getUserId() != null) {
                email = userRepository.findById(order.getUserId())
                        .map(User::getEmail)
                        .orElse("Unknown");
            }
            return new AdminOrderDTO(order, email);
        }).toList();

        return ResponseEntity.ok(dtoList);
    }

    // 🔵 Kullanıcının kendi siparişlerini listele
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller/{sellerId}")
    public List<Order> getOrdersBySellerId(@PathVariable Long sellerId) {
        return orderService.getOrdersBySellerId(sellerId);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(@RequestParam Long userId, @RequestBody CheckoutRequest request) {

        try {
            Order order = orderService.createOrderFromCart(userId, request);
            System.out.println("çalıştı 1");

            if ("Credit Card".equalsIgnoreCase(request.getPaymentMethod())) {
                PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                        .setAmount(calculateTotalAmount(order.getItems()) * 100)
                        .setCurrency("usd")
                        .setPaymentMethod(request.getPaymentMethodId())
                        .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC) // ✅
                        .build(); // confirm = false by default

                PaymentIntent intent = PaymentIntent.create(params);
                order.setPaymentIntentId(intent.getId()); // ödeme oluşturulduktan hemen sonra
                orderRepository.save(order); // paymentIntentId içeren haliyle kaydet
                return ResponseEntity.ok(new OrderResponse(
                        order.getId(),
                        "success",
                        "Stripe clientSecret created",
                        intent.getClientSecret() // ✅ BURASI
                ));
            } else {
                return ResponseEntity.ok(new OrderResponse(
                        order.getId(),
                        "pending",
                        "Cash on Delivery siparişi oluşturuldu",
                        null));
            }

        } catch (Exception e) {
            System.out.println("Burda hata varrr: " + e);
            return ResponseEntity.status(500).body(new OrderResponse(
                    null, "failed", e.getMessage(), null));
        }
    }

    private long calculateTotalAmount(List<OrderItem> items) {
        return items.stream()
                .mapToLong(item -> item.getPrice().longValue() * item.getQuantity())
                .sum();
    }

    // @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    // @PutMapping("/{orderId}/status")
    // public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId,
    // @RequestParam String status) {
    // try {
    // orderService.updateOrderStatus(orderId, status);
    // return ResponseEntity.ok("Order status updated successfully.");
    // } catch (RuntimeException e) {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    // }
    // }

    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    public ResponseEntity<Map<String, String>> updateOrderStatus(@PathVariable Long orderId,
            @RequestParam("status") String status) {
        try {
            orderService.updateOrderStatus(orderId, status);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Order status updated");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PutMapping("/cancel/{orderId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrderBySeller(orderId);
        return ResponseEntity.ok("Order cancelled and refund issued");
    }

}
