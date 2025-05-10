package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.SellerStats;
import com.ecommerce.backend.service.SellerDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
public class SellerDashboardController {

    @Autowired
    private SellerDashboardService dashboardService;

    @GetMapping("/dashboard/{sellerId}")
    public SellerStats getStats(@PathVariable Long sellerId) {
        return new SellerStats(
            dashboardService.getTotalProducts(sellerId),
            dashboardService.getTotalOrders(sellerId),
            dashboardService.getTotalReviews(sellerId)
        );
    }
}
