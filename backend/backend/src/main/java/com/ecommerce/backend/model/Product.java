package com.ecommerce.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automaticly increase ID
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private double price;

    private String imageUrl;

    @Column(nullable = false)
    private int stock; // stok adedi

    private String category;

    @Column(nullable = false)
    private int inCartNumber;

    @Column(nullable = false)
    private int discountPercentage;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private boolean isFavorite;

    @Column(nullable = false)
    private boolean isInWishlist;

    @Column(nullable = false)
    private boolean isInCompare;

    @Column(nullable = false)
    private boolean isInSale;

    public Product() {}

    public Product(String name, String description, double price, String imageUrl, int stock, String category, int inCartNumber,
                    int discountPercentage, double rating, boolean isFavorite, boolean isInWishlist, boolean isInCompare, boolean isInSale) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.category = category;
        this.inCartNumber = inCartNumber;
        this.discountPercentage = discountPercentage;
        this.rating = rating;
        this.isFavorite = isFavorite;
        this.isInWishlist = isInWishlist;
        this.isInCompare = isInCompare;
        this.isInSale = isInSale;
    }

    // --- Getters and Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getInCartNumber() {
        return inCartNumber;
    }

    public void setInCartNumber(int inCartNumber) {
        this.inCartNumber = inCartNumber;
    }

    public int getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(int discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public boolean isInCompare() {
        return isInCompare;
    }

    public void setInCompare(boolean inCompare) {
        isInCompare = inCompare;
    }

    public boolean isInSale() {
        return isInSale;
    }

    public void setInSale(boolean inSale) {
        isInSale = inSale;
    }

    public boolean isInWishlist() {
        return isInWishlist;
    }

    public void setInWishlist(boolean inWishlist) {
        isInWishlist = inWishlist;
    }

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }
}
