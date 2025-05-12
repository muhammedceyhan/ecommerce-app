package com.ecommerce.backend.controller;

import java.util.List;

import com.ecommerce.backend.dto.ProductResponse;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.security.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import com.ecommerce.backend.model.ProductDTO;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.CategoryRepository;
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
    private CategoryRepository categoryRepository;

    @Autowired
    private JwtUtil jwtUtil;



  @GetMapping
public List<ProductResponse> getAllProducts() {
    return productService.getAllProductResponses();
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
    product.setActive(dto.active); // Aktiflik ayarı DTO'dan alınır
    Category category = categoryRepository.findById(dto.categoryId).orElseThrow();
    product.setCategory(category);
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
    

//     @PreAuthorize("hasRole('SELLER','ADMIN')")
//     @PutMapping("/{id}")
// public Product updateProductById(@PathVariable Long id, @RequestBody Product product) {
//     product.setId(id); // ID'yi manuel set ediyoruz
//     product.setActive(product.isActive()); // veya frontend'den gelen değer neyse
//     return productService.updateProduct(product);
// }

@PutMapping("/{id}")
@PreAuthorize("hasAnyRole('SELLER', 'ADMIN')")
public Product updateProductById(@PathVariable Long id, @RequestBody ProductDTO dto) {
    Product product = new Product();
    product.setId(id);
    product.setName(dto.name);
    product.setDescription(dto.description);
    product.setPrice(dto.price);
    product.setImageUrl(dto.imageUrl);
    product.setStock(dto.stock);
    product.setActive(dto.active);
    product.setDiscountPercentage(dto.discountPercentage);
    product.setRating(dto.rating);
    product.setInSale(dto.isInSale);

    Category category = categoryRepository.findById(dto.categoryId)
        .orElseThrow(() -> new RuntimeException("Kategori bulunamadı"));
    product.setCategory(category);

    User seller = userRepository.findById(dto.sellerId)
        .orElseThrow(() -> new RuntimeException("Satıcı bulunamadı"));
    product.setSeller(seller);

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

@PutMapping("/admin/products/{id}/toggle-status")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> toggleProductStatus(@PathVariable Long id) {
    Product product = productService.getProductById(id);
    product.setActive(!product.isActive());
    productService.updateProduct(product);
    return ResponseEntity.ok("Ürün durumu değiştirildi.");
}



    }
