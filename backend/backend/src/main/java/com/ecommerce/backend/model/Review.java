package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private Long userId;

    private String comment;
    private int rating;

    private LocalDateTime commentDate;

    private Long orderId; // yorum yapılan sipariş

    

}
