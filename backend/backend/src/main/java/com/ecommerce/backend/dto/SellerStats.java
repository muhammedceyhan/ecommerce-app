package com.ecommerce.backend.dto;

public class SellerStats {
    private int totalProducts;
    private int totalOrders;
    private int totalReviews;

    public SellerStats(int totalProducts, int totalOrders, int totalReviews) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalReviews = totalReviews;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public int getTotalReviews() {
        return totalReviews;
    }
}
