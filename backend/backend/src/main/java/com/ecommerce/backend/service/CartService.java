package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartDTO;
import com.ecommerce.backend.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;


interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);
    List<Cart> findByUserId(Long userId);
}

@Service
public class CartService {

    @Autowired
    private ProductService productService; // ProductService içinde getProductById methodu olmalı

    @Autowired
    private CartRepository cartRepository;

    public void addProductToCart(Long userId, Long productId) {
        Optional<Cart> existingItem = cartRepository.findByUserIdAndProductId(userId, productId);

        if (existingItem.isPresent()) {
            Cart cart = existingItem.get();
            cart.setQuantity(cart.getQuantity() + 1);
            cartRepository.save(cart);
        } else {
            Cart newCart = new Cart(userId, productId, 1);
            cartRepository.save(newCart);
        }
    }

    public List<CartDTO> getUserCart(Long userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);

        return cartItems.stream().map(cart -> {
            Product product = productService.getProductById(cart.getProductId());
            return new CartDTO(
                    cart.getId(),
                    product.getId(),
                    product.getName(),
                    product.getImageUrl(),
                    product.getPrice(),
                    cart.getQuantity()
            );
        }).collect(Collectors.toList());
    }
    public int getProductQuantityInCart(Long userId, Long productId) {
        return cartRepository.findByUserIdAndProductId(userId, productId)
                .map(Cart::getQuantity)
                .orElse(0); // Ürün sepette yoksa 0 döner
    }

    public void updateCartItemQuantity(Long cartItemId, int quantity) {
        Cart cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        cartRepository.save(cartItem);
    }

    public void removeCartItem(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

}
