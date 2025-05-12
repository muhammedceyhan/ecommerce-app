package com.ecommerce.backend.config;
import static org.springframework.http.HttpMethod.GET;
import com.ecommerce.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
          .cors().and().csrf().disable()
          .authorizeHttpRequests(auth -> auth
              // Kayıt ve giriş endpoint'leri herkese açık
              .requestMatchers("/api/auth/**").permitAll()
              .requestMatchers("/error").permitAll()
              // Ürünler GET herkese açık
              .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
              .requestMatchers(HttpMethod.GET, "/api/users/**").authenticated()

              // Test-users: hem liste hem kullanıcı bazlı GET herkese açık
              .requestMatchers(HttpMethod.GET,
                  "/api/test-users",
                  "/api/test-users/**"
              ).permitAll()

              // Tüm OPTIONS istekleri (preflight) herkese açık
              .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

              // /api/admin/** sadece ADMIN rolüne açık
              .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/user/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/user/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/user/**").authenticated()
                .requestMatchers("/api/payment-methods/**").authenticated()
                .requestMatchers("/api/favorites/**").authenticated()
                  .requestMatchers(HttpMethod.GET, "/api/categories").permitAll() // ✅ bu satır
                
              // Geri kalanı oturum ister
              .anyRequest().authenticated()
          )
          .sessionManagement(sess ->
              sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          )
          .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
