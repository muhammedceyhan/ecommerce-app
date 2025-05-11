package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductResponse;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
    public List<Product> getProductsInCart() {
        return productRepository.findByInCartNumberGreaterThan(0);
    }


    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    

    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findBySellerId(userId);
    }


   public List<ProductResponse> getAllProductResponses() {
    return productRepository.findAll().stream().map(p -> {
        ProductResponse res = new ProductResponse();
        res.id = p.getId();
        res.name = p.getName();
        res.description = p.getDescription();
        res.price = p.getPrice();
        res.imageUrl = p.getImageUrl();
        res.stock = p.getStock();

        // 💥 Hata burada oluşuyordu
        if (p.getCategory() != null) {
            res.categoryId = p.getCategory().getId();
            res.categoryName = p.getCategory().getName();
        } else {
            res.categoryId = null;
            res.categoryName = "Kategori Yok";
        }

        res.discountPercentage = p.getDiscountPercentage();
        res.rating = p.getRating();
        res.isFavorite = p.isFavorite();
        res.isInCompare = p.isInCompare();
        res.isInWishlist = p.isInWishlist();
        res.isInSale = p.isInSale();
        return res;
    }).toList();
}



}