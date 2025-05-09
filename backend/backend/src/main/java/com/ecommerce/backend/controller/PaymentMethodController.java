package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.PaymentMethod;
import com.ecommerce.backend.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodService service;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentMethod>> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<PaymentMethod> add(@RequestBody PaymentMethod paymentMethod) {
        return ResponseEntity.ok(service.save(paymentMethod));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
