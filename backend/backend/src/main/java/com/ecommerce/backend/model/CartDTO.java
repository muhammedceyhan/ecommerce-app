package com.ecommerce.backend.model;

public class CartDTO {

    private Long cartItemId;    // Cart tablosundaki id
    private Long productId;     // Ürünün ID'si
    private String productName; // Ürün Adı
    private String productImageUrl; // Ürün görseli
    private double productPrice; // Ürün fiyatı
    private int quantity;        // Sepetteki ürün adedi

    public CartDTO() {}

    public CartDTO(Long cartItemId, Long productId, String productName, String productImageUrl, double productPrice, int quantity) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.productPrice = productPrice;
        this.quantity = quantity;
    }

    // Getters ve Setters
    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
