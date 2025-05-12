package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.OrderItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // OrderItemRepository.java dosyasına EKLE
    long countByProductId(Long productId); // ✅ Burada doğru yer

    // ✅ Toplam satış (adet)
    @Query("SELECT SUM(i.quantity) FROM OrderItem i WHERE i.product.id IN :productIds")
    Integer getTotalSalesByProductIds(@Param("productIds") List<Long> productIds);

    // ✅ Toplam gelir (adet × fiyat)
    @Query("SELECT SUM(i.quantity * i.price) FROM OrderItem i WHERE i.product.id IN :productIds")
    Double getTotalRevenueByProductIds(@Param("productIds") List<Long> productIds);

    // ✅ En çok satılan ürünler
    @Query("SELECT i.product.id, SUM(i.quantity) as totalQuantity " +
            "FROM OrderItem i WHERE i.product.id IN :productIds " +
            "GROUP BY i.product.id ORDER BY totalQuantity DESC")
    List<Object[]> getTopSellingProducts(@Param("productIds") List<Long> productIds);
}
