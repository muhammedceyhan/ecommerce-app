package com.ecommerce.backend.controller;

import java.util.List;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.ProductDTO;
import com.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping()
    public Product addProduct(@RequestBody ProductDTO dto) {

        Product product = new Product();
        product.setName(dto.name);
        product.setDescription(dto.description);
        product.setPrice(dto.price);
        product.setImageUrl(dto.imageUrl);
        product.setStock(dto.stock);
        product.setCategory(dto.category);
        product.setInCartNumber(dto.inCartNumber);
        product.setDiscountPercentage(dto.discountPercentage);
        product.setRating(dto.rating);
        product.setFavorite(dto.isFavorite);
        product.setInWishlist(dto.isInWishlist);
        product.setInCompare(dto.isInCompare);
        product.setInSale(dto.isInSale);


        return productService.addProduct(product);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
    @PutMapping("/{id}")
    public Product updateProductById(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

}
