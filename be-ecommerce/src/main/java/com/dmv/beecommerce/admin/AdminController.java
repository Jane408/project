package com.dmv.beecommerce.admin;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AdminController {
    private final AdminService adminService;
    @GetMapping("/admin/profile")
    public AdminResponseDto adminProfile(){
        return adminService.getAdminProfile();
    }

}
