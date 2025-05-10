package com.ecommerce.backend.dto;

import java.time.LocalDateTime;

import com.ecommerce.backend.model.Order;

public class AdminOrderDTO {
    private Long id;
    private Long userId;
    private String userEmail;
    private LocalDateTime purchaseDate;
    private String status;

    // Constructor
    public AdminOrderDTO(Order order, String userEmail) {
        this.id = order.getId();
        this.userId = order.getUserId();
        this.userEmail = userEmail;
        this.purchaseDate = order.getPurchaseDate();
        this.status = order.getStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Getter-Setter (gerekirse ekle)
    
}
