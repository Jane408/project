package com.dmv.beecommerce.customer;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class CustomerController {
    private CustomerService customerService;
    @GetMapping("/customer/profile")
    public CustomerResponseDto customerProfile() {
        return customerService.getCustomerProfile();
    }

    @GetMapping("/customers")
    public List<CustomerResponseDto> customers() {
        return customerService.allGetCustomers();
    }

    @GetMapping("/customers/summary")
    public CustomerTotalResponseDto customerTotal() {
        return customerService.totalGetCustomers();
    }
}
