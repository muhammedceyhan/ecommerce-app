package com.ecommerce.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.security.JwtUtil;
import com.ecommerce.backend.service.OrderService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/seller")
@PreAuthorize("hasRole('SELLER')")
public class SellerController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
private ProductRepository productRepository;


    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getSellerOrders(HttpServletRequest request) {
        String token = extractToken(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Claims claims = jwtUtil.extractAllClaims(token);
        Long sellerId = claims.get("id", Long.class);

        List<Order> orders = orderService.getOrdersBySellerId(sellerId);
        return ResponseEntity.ok(orders);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }


    @GetMapping("/stats")
public ResponseEntity<?> getSellerStats(HttpServletRequest request) {
    String token = extractToken(request);
    if (token == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    Claims claims = jwtUtil.extractAllClaims(token);
    Long sellerId = claims.get("id", Long.class);

    Integer totalSales = orderService.getTotalSalesBySeller(sellerId);
    Double totalRevenue = orderService.getTotalRevenueBySeller(sellerId);
    List<Object[]> topProducts = orderService.getTopSellingProducts(sellerId);

    Map<String, Object> stats = new HashMap<>();
    stats.put("totalSales", totalSales);
    stats.put("totalRevenue", totalRevenue);
    stats.put("topSellingProducts", topProducts);

    return ResponseEntity.ok(stats);
}


}
