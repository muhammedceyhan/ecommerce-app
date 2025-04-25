package com.ecommerce.backend;

import com.ecommerce.backend.model.Role;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication(
    exclude = {
      SecurityAutoConfiguration.class,
      ManagementWebSecurityAutoConfiguration.class
    }
)
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("ozkan")) {
                User user = new User(
                    "ozkan",
                    "ozkan@example.com",
                    passwordEncoder.encode("123456"),
                    Role.ROLE_USER
                );
                userRepository.save(user);
                System.out.println("✅ Kullanıcı başarıyla eklendi.");
            }
        };
    }

}
