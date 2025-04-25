// src/main/java/com/ecommerce/backend/model/Role.java

package com.ecommerce.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Locale;

public enum Role {
    ROLE_USER,
    ROLE_ADMIN,
    ROLE_SELLER;

    /** 
     * Hem "USER"/"ADMIN"/"SELLER" hem de "ROLE_USER"/… stringlerini kabul eder 
     */
    @JsonCreator
    public static Role from(String value) {
        String v = value.toUpperCase(Locale.ROOT);
        if (!v.startsWith("ROLE_")) {
            v = "ROLE_" + v;
        }
        return Role.valueOf(v);
    }

    /** 
     * JSON’a yazarken tam enum ismi (ROLE_…) kullanılsın 
     */
    @JsonValue
    public String toValue() {
        return name();
    }
}
