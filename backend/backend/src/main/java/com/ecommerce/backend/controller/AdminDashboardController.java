package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.DashboardStats;
import com.ecommerce.backend.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService dashboardService;

    @GetMapping("/dashboard")
    public DashboardStats getStats() {
        return new DashboardStats(
            dashboardService.getTotalUsers(),
            dashboardService.getTotalProducts(),
            dashboardService.getTotalOrders()
        );
    }
}
