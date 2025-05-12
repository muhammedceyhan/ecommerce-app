package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.UpdateRoleRequest;
import com.ecommerce.backend.model.Role;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // 🔵 1. Tüm kullanıcıları listele
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // 🔵 2. Kullanıcıyı ID ile sil
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully.");
    }

    // 🔵 3. Kullanıcının rolünü değiştir
    @PutMapping("/users/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Long id, @RequestBody UpdateRoleRequest request) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();

        try {
            Role roleEnum = Role.from(request.getRole()); // örn: ROLE_SELLER
            user.setRole(roleEnum);
            userRepository.save(user);
            return ResponseEntity.ok("User role updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role: " + request.getRole());
        }
    }

    @PutMapping("/users/{id}/ban")
public ResponseEntity<String> banUser(@PathVariable Long id) {
    Optional<User> optionalUser = userRepository.findById(id);
    if (optionalUser.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    User user = optionalUser.get();
    user.setBanned(true);
    userRepository.save(user);
    return ResponseEntity.ok("User banned successfully.");
}

@PutMapping("/users/{id}/unban")
public ResponseEntity<String> unbanUser(@PathVariable Long id) {
    Optional<User> optionalUser = userRepository.findById(id);
    if (optionalUser.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    User user = optionalUser.get();
    user.setBanned(false);
    userRepository.save(user);
    return ResponseEntity.ok("User unbanned successfully.");
}

}
