package com.ecommerce.backend.model;

import java.util.List;

public class CheckoutRequest {
    private String shippingAddress;
    private String note;
    private String paymentMethod; // "Credit Card" or "Cash on Delivery"
    private String paymentMethodId;
    private List<Cart> cartItems;
    public String getShippingAddress() {
        return shippingAddress;
    }
    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    public String getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public String getPaymentMethodId() {
        return paymentMethodId;
    }
    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }
    public List<Cart> getCartItems() {
        return cartItems;
    }
    public void setCartItems(List<Cart> cartItems) {
        this.cartItems = cartItems;
    }

    
}