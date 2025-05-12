package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.LoginRequest;
import com.ecommerce.backend.dto.RegisterRequest;
import com.ecommerce.backend.dto.JwtResponse;
import com.ecommerce.backend.model.Role;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Kullanıcı kayıt işlemi
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Kullanıcı email kontrolü
        System.out.println("gelen request: " + request.getEmail());
        if (userRepository.existsByEmail(request.getEmail())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "This email is already taken");
            return ResponseEntity.status(400).body(error); // ✅ geçerli JSON
        }

        // Role kontrolü: Eğer geçerli bir rol verilmediyse, varsayılan olarak 'USER'
        // rolü eklenir
        Role role = request.getRole();
        if (role == null) {
            role = Role.ROLE_USER; // enumunuzda bu şekilde tanımlı olmalı
        }

        // Kullanıcı oluşturuluyor
        User user = new User(request.getUsername(), request.getEmail(),
                passwordEncoder.encode(request.getPassword()), role);
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Registration successful!");
        return ResponseEntity.ok(response);
    }

    // ✅ Kullanıcı giriş işlemi
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı bulunamadı");
        }

        User user = userOptional.get();

        // ⛔ Yasaklı kontrolü
        if (user.isBanned()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Kullanıcı yasaklanmış.");
        }
        // Şifre kontrolü
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Şifre yanlış");
        }

        // JWT token oluşturuluyor
        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getUsername(), user.getRole());
        return ResponseEntity.ok(new JwtResponse(token, user.getRole()));
    }

    @GetMapping("/{id}/username")
    public ResponseEntity<String> getUsernameById(@PathVariable Long id) {
        String username = userRepository.findById(id)
                .map(User::getUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(username);
    }
}
