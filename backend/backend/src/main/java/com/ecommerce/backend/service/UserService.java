package com.ecommerce.backend.service;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User updatedData) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(updatedData.getUsername());
            user.setEmail(updatedData.getEmail());
            user.setAddresses(updatedData.getAddresses());
            user.setPhone(updatedData.getPhone());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }

    public boolean changePassword(Long id, String oldPassword, String newPassword) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(oldPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}
