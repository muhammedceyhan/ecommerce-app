package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Cart;

import com.ecommerce.backend.dto.CheckoutRequest;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.OrderItem;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductRepository;

import jakarta.transaction.Transactional;

import com.ecommerce.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService; // zaten var mı kontrol et, yoksa ekle

    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    // 🔵 Sipariş oluştur
    public Order createOrder(Order order) {
        // Sipariş zamanı ayarlanıyor
        order.setPurchaseDate(LocalDateTime.now());
        order.setStatus("PREPARING"); // Başlangıçta "Hazırlanıyor" olarak başlasın

        // Order içindeki tüm OrderItem'ları kaydet
        for (OrderItem item : order.getItems()) {
            item.setOrder(order); // Her item'a bağlı sipariş atanıyor
        }

        // Önce sipariş kaydediliyor (Order + Items cascade ile birlikte kaydedilecek)
        return orderRepository.save(order);
    }

    // 🔵 Tüm siparişleri listele
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 🔵 Kullanıcıya özel siparişleri getir
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // public List<Order> getOrdersBySellerId(Long sellerId) {
    // List<Product> sellerProducts = productService.getProductsByUserId(sellerId);
    // List<Long> productIds = sellerProducts.stream()
    // .map(Product::getId)
    // .toList(); // Java 16+ için .toList(), Java 8 için
    // .collect(Collectors.toList())

    // if (productIds.isEmpty()) {
    // return List.of(); // satıcının hiç ürünü yoksa boş liste döner
    // }

    // return orderRepository.findOrdersByProductIds(productIds);
    // }

    public List<Order> getOrdersBySellerId(Long sellerId) {
        List<Product> sellerProducts = productService.getProductsByUserId(sellerId);
        List<Long> productIds = sellerProducts.stream()
                .map(Product::getId)
                .toList();

        if (productIds.isEmpty())
            return List.of();

        return orderRepository.findOrdersByProductIds(productIds)
                .stream()
                .filter(order -> !order.getStatus().equalsIgnoreCase("Cancelled")) // 👈 sadece bu satır eklendi
                .toList();
    }

    public Integer getTotalSalesBySeller(Long sellerId) {
        List<Product> sellerProducts = productService.getProductsByUserId(sellerId);
        List<Long> productIds = sellerProducts.stream().map(Product::getId).toList();
        if (productIds.isEmpty())
            return 0;
        return orderRepository.getTotalSalesByProductIds(productIds);
    }

    public Double getTotalRevenueBySeller(Long sellerId) {
        List<Product> sellerProducts = productService.getProductsByUserId(sellerId);
        List<Long> productIds = sellerProducts.stream().map(Product::getId).toList();
        if (productIds.isEmpty())
            return 0.0;
        return orderRepository.getTotalRevenueByProductIds(productIds);
    }

    public List<Object[]> getTopSellingProducts(Long sellerId) {
        List<Product> sellerProducts = productService.getProductsByUserId(sellerId);
        List<Long> productIds = sellerProducts.stream().map(Product::getId).toList();
        if (productIds.isEmpty())
            return List.of();
        return orderRepository.getTopSellingProducts(productIds);
    }

    @Transactional
    public Order createOrderFromCart(Long userId, CheckoutRequest checkoutRequest) {
        List<Cart> cartItems = cartService.getCartItemsByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setPurchaseDate(LocalDateTime.now());
        order.setStatus("Processing");

        order.setPaymentMethod(checkoutRequest.getPaymentMethod());
        order.setShippingAddress(checkoutRequest.getShippingAddress());
        order.setNote(checkoutRequest.getNote());

        List<OrderItem> orderItems = new ArrayList<>();

        for (Cart cartItem : cartItems) {
            // 🔒 Ürünü kilitle ve çek
            Product product = productRepository.findByIdForUpdate(cartItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // ❗ Stok kontrolü
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Yetersiz stok: " + product.getName());
            }

            // ✅ Stok düş
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            // ✅ Sipariş kalemi oluştur
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        orderRepository.save(order);

        // ✅ Sepeti temizle
        cartRepository.deleteAllByUserId(userId);

        return order;
    }

    @Transactional
    public void updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
    }

}
