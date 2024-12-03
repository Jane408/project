package com.dmv.beecommerce.customer;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    public CustomerResponseDto getCustomerProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Optional<Customer> customer = customerRepository.findByUserName(authentication.getName());
            if (customer.isPresent()) {
                Customer customerInfo = customer.get();
                return customerMapper.toCustomerResponseDto(customerInfo);
            }
        }
        return null;
    }

    public List<CustomerResponseDto> allGetCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(customerMapper::toCustomerResponseDto).collect(Collectors.toList());

    }

    public CustomerTotalResponseDto totalGetCustomers() {
        return customerMapper.toCustomerTotalResponseDto(customerRepository.count());
    }
}
