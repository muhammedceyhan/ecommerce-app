package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    @Query("SELECT DISTINCT o FROM Order o JOIN o.items i WHERE i.product.id IN :productIds")
    List<Order> findOrdersByProductIds(List<Long> productIds);

    @Query("SELECT SUM(i.quantity) FROM OrderItem i WHERE i.product.id IN :productIds")
    Integer getTotalSalesByProductIds(@Param("productIds") List<Long> productIds);

    @Query("SELECT SUM(i.price * i.quantity) FROM OrderItem i WHERE i.product.id IN :productIds")
    Double getTotalRevenueByProductIds(@Param("productIds") List<Long> productIds);

    @Query("SELECT i.product.id, SUM(i.quantity) as totalQuantity FROM OrderItem i WHERE i.product.id IN :productIds GROUP BY i.product.id ORDER BY totalQuantity DESC")
    List<Object[]> getTopSellingProducts(@Param("productIds") List<Long> productIds);

    @Query("SELECT DISTINCT o FROM Order o JOIN o.items i WHERE i.product.seller.id = :sellerId")
    List<Order> findOrdersBySellerId(Long sellerId);

    @Query("SELECT o FROM Order o JOIN o.items i WHERE o.userId = :userId AND i.product.id = :productId AND o.status = :status")
    List<Order> findDeliveredOrdersWithProduct(@Param("userId") Long userId,
            @Param("productId") Long productId,
            @Param("status") String status);

}
