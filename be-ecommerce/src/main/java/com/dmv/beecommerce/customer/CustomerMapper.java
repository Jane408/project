package com.dmv.beecommerce.customer;

import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {
    public CustomerResponseDto toCustomerResponseDto(Customer customer) {
        return new CustomerResponseDto(customer.getId(), customer.getFullName(), customer.getPhoneNumber(), customer.getAddress()
                ,customer.getPassword(), customer.getPassword());
    }

    public CustomerTotalResponseDto toCustomerTotalResponseDto(Long total) {
        return new CustomerTotalResponseDto(total);
    }
}
