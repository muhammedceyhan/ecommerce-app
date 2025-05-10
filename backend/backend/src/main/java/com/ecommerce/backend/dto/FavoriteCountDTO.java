package com.ecommerce.backend.dto;

public class FavoriteCountDTO {
    private Long productId;
    private int favoriteCount;

    public FavoriteCountDTO(Long productId, int favoriteCount) {
        this.productId = productId;
        this.favoriteCount = favoriteCount;
    }

    public Long getProductId() {
        return productId;
    }

    public int getFavoriteCount() {
        return favoriteCount;
    }
}
