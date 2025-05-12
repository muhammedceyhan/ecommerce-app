package com.ecommerce.backend.service;

import com.ecommerce.backend.model.PaymentMethod;
import com.ecommerce.backend.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
  import com.stripe.model.Refund;
import com.stripe.param.RefundCreateParams;
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

  

public void refundPayment(String paymentIntentId) {
    RefundCreateParams params = RefundCreateParams.builder()
        .setPaymentIntent(paymentIntentId)
        .build();

    try {
        Refund refund = Refund.create(params);
        System.out.println("Refunded: " + refund.getId());
    } catch (Exception e) {
        throw new RuntimeException("Refund failed", e);
    }
}

}
