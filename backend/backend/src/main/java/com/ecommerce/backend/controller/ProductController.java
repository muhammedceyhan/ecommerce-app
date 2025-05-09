package com.ecommerce.backend.controller;

import java.util.List;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.security.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import com.ecommerce.backend.model.ProductDTO;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;



    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PreAuthorize("hasRole('SELLER')")
@PostMapping()
public Product addProduct(@RequestBody ProductDTO dto) {

    Product product = new Product();
    product.setName(dto.name);
    product.setDescription(dto.description);
    product.setPrice(dto.price);
    product.setImageUrl(dto.imageUrl);
    product.setStock(dto.stock);
    product.setCategory(dto.category);
    product.setDiscountPercentage(dto.discountPercentage);
    product.setRating(dto.rating);
    product.setInSale(dto.isInSale);

    // 👇 sellerId'yi dto'dan çekiyoruz
    User seller = userRepository.findById(dto.sellerId)
        .orElseThrow(() -> new RuntimeException("Seller not found"));

    product.setSeller(seller);  // ✅ seller'i set ediyorsun
    return productService.addProduct(product);
}

    



    //@PreAuthorize("hasRole('SELLER')")
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
    

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{id}")
public Product updateProductById(@PathVariable Long id, @RequestBody Product product) {
    product.setId(id); // ID'yi manuel set ediyoruz
    return productService.updateProduct(product);
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.ok("Product deleted successfully.");
}

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller/{userId}")
    public ResponseEntity<List<Product>> getProductsByUserId(@PathVariable Long userId) {
        List<Product> products = productService.getProductsByUserId(userId);
        return ResponseEntity.ok(products);
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller/me")
    public ResponseEntity<List<Product>> getProductsForLoggedUser(HttpServletRequest request) {
        String token = extractToken(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Claims claims = jwtUtil.extractAllClaims(token);
        Long userId = claims.get("id", Long.class);
        List<Product> products = productService.getProductsByUserId(userId);
        return ResponseEntity.ok(products);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    




}
