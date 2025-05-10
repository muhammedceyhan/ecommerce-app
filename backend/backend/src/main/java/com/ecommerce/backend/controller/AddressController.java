package com.ecommerce.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.model.Address;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.service.AddressService;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<Address> addAddress(@RequestParam Long userId, @RequestBody Address address) {
        User user = userRepository.findById(userId).orElseThrow();
        Address saved = addressService.saveAddressForUser(user, address);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getAddressesByUserId(userId));
    }
    @GetMapping("/user/{userId}/default")
    public ResponseEntity<Address> getDefaultAddress(@PathVariable Long userId) {
        Address defaultAddress = addressService.getDefaultAddressForUser(userId);
        if (defaultAddress != null) {
            return ResponseEntity.ok(defaultAddress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
