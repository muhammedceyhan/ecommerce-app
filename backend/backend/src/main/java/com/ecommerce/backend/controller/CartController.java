package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.service.CartService;
import com.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Sepetteki ürünleri getir (inCartNumber > 0)
    @GetMapping("/items")
    public List<Product> getCartItems() {
        return cartService.getProductsInCart();
    }

    @PutMapping("/{id}")
    public Product updateProductById(@RequestBody Product product) {
        return cartService.updateProduct(product);
    }
}
