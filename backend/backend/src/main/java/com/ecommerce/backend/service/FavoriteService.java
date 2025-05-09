package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Favorite;
import com.ecommerce.backend.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoritesByUserId(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public Favorite addFavorite(Favorite favorite) {
        // Aynı ürün favoride varsa tekrar eklenmesin
        Optional<Favorite> existing = favoriteRepository.findByUserIdAndProductId(favorite.getUserId(), favorite.getProductId());
        return existing.orElseGet(() -> favoriteRepository.save(favorite));
    }

    public void removeFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }

    public int getFavoriteCountByProductId(Long productId) {
        return favoriteRepository.countByProductId(productId);
    }

}
