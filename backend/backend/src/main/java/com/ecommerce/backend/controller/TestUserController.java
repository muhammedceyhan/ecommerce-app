package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-users")
public class TestUserController {

    private final UserRepository userRepository;

    public TestUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 1️⃣ Tüm kullanıcıları getir
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2️⃣ Yeni kullanıcı ekle (body'den veri alır)
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // 3️⃣ Belirli kullanıcıyı getir (username ile)
    @GetMapping("/{username}")
    public User getByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }
}
