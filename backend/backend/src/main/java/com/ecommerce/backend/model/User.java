package com.ecommerce.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

   @Column(name = "balance")
    private Double balance = 1000.0;

    @Column(name = "is_banned", nullable = false)
private boolean isBanned = false;



    @Enumerated(EnumType.STRING)  // Enum olarak saklanmasını sağlıyoruz
    @Column(nullable = false)
    private Role role = Role.ROLE_USER;  // Varsayılan olarak USER rolü


    // 🔗 İlişki: 1 kullanıcı - N adres
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    @Column(name = "phone")
    private String phone;


    // --- Constructorlar ---

    public User() {
    }

    public User(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    

    // --- Getter & Setterlar ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }



    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public Double getBalance() {
        return balance != null ? balance : 0.0;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public boolean isBanned() {
    return isBanned;
}

public void setBanned(boolean banned) {
    isBanned = banned;
}

    

}
