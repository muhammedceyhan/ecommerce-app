package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.FavoriteDTO;
import com.ecommerce.backend.model.Favorite;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.service.FavoriteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;
    
    @Autowired
    private ProductRepository productRepository;


    // @GetMapping("/user/{userId}")
    // public ResponseEntity<List<Favorite>> getFavoritesByUser(@PathVariable Long userId) {
    //     return ResponseEntity.ok(favoriteService.getFavoritesByUserId(userId));
    // }

@GetMapping("/user/{userId}")
public ResponseEntity<List<FavoriteDTO>> getFavoritesWithProduct(@PathVariable Long userId) {
    List<Favorite> favorites = favoriteService.getFavoritesByUserId(userId);

    List<FavoriteDTO> dtos = favorites.stream().map(fav -> {
        Product product = productRepository.findById(fav.getProductId()).orElse(null);
        if (product == null) return null;

        return new FavoriteDTO(
        fav.getId(),
        fav.getUserId(),
        fav.getProductId(),
        product.getName(),
        BigDecimal.valueOf(product.getPrice()),
        product.getImageUrl()
        );
    }).filter(dto -> dto != null).toList();

    return ResponseEntity.ok(dtos);
}


    @PostMapping
    public ResponseEntity<Favorite> addFavorite(@RequestBody Favorite favorite) {
        return ResponseEntity.ok(favoriteService.addFavorite(favorite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        favoriteService.removeFavorite(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/product/{productId}/count")
    public ResponseEntity<Integer> getFavoriteCount(@PathVariable Long productId) {
        return ResponseEntity.ok(favoriteService.getFavoriteCountByProductId(productId));
    }

}
