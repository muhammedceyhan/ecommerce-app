package com.ecommerce.backend.dto;

public class ProductResponse {
    public Long id;
    public String name;
    public String description;
    public double price;
    public String imageUrl;
    public int stock;
    public Long categoryId;
    public String categoryName;
    public int discountPercentage;
    public double rating;
    public boolean isFavorite;
    public boolean isInWishlist;
    public boolean isInCompare;
    public boolean isInSale;
}
