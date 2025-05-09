package com.ecommerce.backend.config;


import com.stripe.Stripe;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StripeInitializer {

    @PostConstruct
    public void init() {
        Stripe.apiKey = "sk_test_51RLjXdQawFGxfZWiqTzJIpwCf38lzzqluXmCE9OPyedy6Z89Qlwuy8PflNaMvcCDNFIqEzWjhY1wzEP6z3iHcSs300OlZbK6NG"; // 🔐 Stripe SECRET KEY BURAYA
    }
}