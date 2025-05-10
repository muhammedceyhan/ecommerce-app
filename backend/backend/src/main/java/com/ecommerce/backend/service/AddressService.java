package com.ecommerce.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.model.Address;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }


    public Address getDefaultAddressForUser(Long userId) {
        return addressRepository.findByUserIdAndIsDefaultTrue(userId)
            .orElse(null); // veya .orElseThrow() da yazabilirsin
    }
    public Address saveAddressForUser(User user, Address newAddress) {
        if (newAddress.isDefault()) {
            // ✅ Var olan tüm adreslerdeki default'u sıfırla
            List<Address> existing = addressRepository.findByUserId(user.getId());
            for (Address addr : existing) {
                if (addr.isDefault()) {
                    addr.setIsDefault(false);
                    addressRepository.save(addr);
                }
            }
        }
    
        newAddress.setUser(user);
        return addressRepository.save(newAddress);
    }
}
