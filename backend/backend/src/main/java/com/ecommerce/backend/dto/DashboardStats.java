package com.ecommerce.backend.dto;

public class DashboardStats {
    private int totalUsers;
    private int totalProducts;
    private int totalOrders;

    public DashboardStats(int totalUsers, int totalProducts, int totalOrders) {
        this.totalUsers = totalUsers;
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public int getTotalOrders() {
        return totalOrders;
    }
}
