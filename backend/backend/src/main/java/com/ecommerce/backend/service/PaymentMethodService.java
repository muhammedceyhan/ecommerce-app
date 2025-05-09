package com.ecommerce.backend.service;

import com.ecommerce.backend.model.PaymentMethod;
import com.ecommerce.backend.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodService {

    @Autowired
    private PaymentMethodRepository repository;

    public List<PaymentMethod> getByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public PaymentMethod save(PaymentMethod paymentMethod) {
        return repository.save(paymentMethod);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
