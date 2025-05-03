package com.ecommerce.backend.controller;


import com.ecommerce.backend.model.CartDTO;
import com.ecommerce.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addToCart(@RequestParam Long userId, @RequestParam Long productId) {
        cartService.addProductToCart(userId, productId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Ürün sepete eklendi.");

        return ResponseEntity.ok(response);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getUserCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getUserCart(userId));
    }

    @GetMapping("/{userId}/quantity/{productId}")
    public ResponseEntity<Integer> getProductQuantityInCart(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        int quantity = cartService.getProductQuantityInCart(userId, productId);
        return ResponseEntity.ok(quantity);
    }

    // Ürün adedini güncelle
    @PutMapping("/{cartItemId}/update-quantity")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long cartItemId, @RequestParam int quantity) {
        cartService.updateCartItemQuantity(cartItemId, quantity);
        return ResponseEntity.ok("Cart item quantity updated.");
    }

    // Sepetten ürünü kaldır
    @DeleteMapping("/{cartItemId}/remove")
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        cartService.removeCartItem(cartItemId);
        return ResponseEntity.ok("Cart item removed from cart.");
    }

}
