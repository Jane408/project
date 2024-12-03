package com.dmv.beecommerce.admin;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminMapper {

    public AdminResponseDto toAdminResponseDto(Admin admin) {
        return new AdminResponseDto(admin.getFullName(), admin.getAddress());
    }
}
