package com.ecommerce.backend.model;
public class OrderResponse {
    private Long orderId;
    private String status;
    private String message;
    private String clientSecret;

    public OrderResponse(Long orderId, String status, String message, String clientSecret) {
        this.orderId = orderId;
        this.status = status;
        this.message = message;
        this.clientSecret = clientSecret;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    // Getter ve Setter'lar
}