package com.ecommerce.backend.dto;

import java.util.List;

public class SellerStatsDTO {
    private int totalSales;
    private double totalRevenue;
    private List<TopProduct> topProducts;

    // Inner class for product info
    public static class TopProduct {
        private Long productId;
        private String productName;
        private int quantitySold;

        public TopProduct(Long productId, String productName, int quantitySold) {
            this.productId = productId;
            this.productName = productName;
            this.quantitySold = quantitySold;
        }

        // Getters and setters
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public int getQuantitySold() { return quantitySold; }
        public void setQuantitySold(int quantitySold) { this.quantitySold = quantitySold; }
    }

    // Main DTO getters/setters
    public int getTotalSales() { return totalSales; }
    public void setTotalSales(int totalSales) { this.totalSales = totalSales; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public List<TopProduct> getTopProducts() { return topProducts; }
    public void setTopProducts(List<TopProduct> topProducts) { this.topProducts = topProducts; }
}
