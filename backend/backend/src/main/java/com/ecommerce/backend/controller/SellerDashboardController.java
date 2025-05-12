package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.SellerStatsDTO;
import com.ecommerce.backend.dto.SellerStatsDTO.TopProduct;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.OrderItemRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.security.JwtUtil;
import io.jsonwebtoken.Claims;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/seller/dashboard")
public class SellerDashboardController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping("/stats")
    public SellerStatsDTO getSellerStats(HttpServletRequest request) {
        String token = extractToken(request);
        Claims claims = jwtUtil.extractAllClaims(token);
        Long sellerId = claims.get("id", Long.class);

        // Satıcıya ait ürünleri bul
        List<Product> sellerProducts = productRepository.findBySellerId(sellerId);
        List<Long> productIds = sellerProducts.stream()
                .map(Product::getId)
                .toList();

        // Toplam satış ve gelir
        int totalSales = Optional.ofNullable(orderItemRepository.getTotalSalesByProductIds(productIds)).orElse(0);
        double totalRevenue = Optional.ofNullable(orderItemRepository.getTotalRevenueByProductIds(productIds)).orElse(0.0);

        // En çok satılan ürünler
        List<Object[]> topSellingRaw = orderItemRepository.getTopSellingProducts(productIds);
        List<TopProduct> topSellingList = new ArrayList<>();

        for (Object[] row : topSellingRaw) {
            Long productId = (Long) row[0];
            int quantity = ((Number) row[1]).intValue();

            String productName = sellerProducts.stream()
                    .filter(p -> p.getId().equals(productId))
                    .map(Product::getName)
                    .findFirst()
                    .orElse("Unknown");

            topSellingList.add(new TopProduct(productId, productName, quantity));
        }

        SellerStatsDTO dto = new SellerStatsDTO();
        dto.setTotalSales(totalSales);
        dto.setTotalRevenue(totalRevenue);
        dto.setTopProducts(topSellingList);

        return dto;
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        return (bearerToken != null && bearerToken.startsWith("Bearer "))
                ? bearerToken.substring(7) : null;
    }
}
