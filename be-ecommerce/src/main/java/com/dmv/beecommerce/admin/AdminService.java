package com.dmv.beecommerce.admin;

import com.dmv.beecommerce.customer.Customer;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminService {
    private final AdminMapper adminMapper;
    private final AdminRepository adminRepository;
    public AdminResponseDto getAdminProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Optional<Admin> admin = adminRepository.findByUserName(authentication.getName());
            if (admin.isPresent()) {
               Admin adminInfo = admin.get();
                return adminMapper.toAdminResponseDto(adminInfo);
            }
        }
        return null;
    }

}
