package com.dmv.beecommerce.auth;


import com.dmv.beecommerce.admin.Admin;
import com.dmv.beecommerce.admin.AdminRepository;
import com.dmv.beecommerce.cart.Cart;
import com.dmv.beecommerce.cart.CartRepository;
import com.dmv.beecommerce.config.JwtService;
import com.dmv.beecommerce.customer.Customer;
import com.dmv.beecommerce.customer.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AdminRepository adminRepository;
    private final CartRepository cartRepository;
    public AuthenticationReponse register(RegisterRequest registerRequest) {
        var customer = Customer.builder()
                .fullName(registerRequest.getFullName())
                .address(registerRequest.getAddress())
                .phoneNumber(registerRequest.getPhoneNumber())
                .userName(registerRequest.getUserName())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        Cart cart = new Cart();
        cart.setCustomer(customer);
        customer.setCart(cart);
        customerRepository.save(customer);
        var customerUserDetails = new CustomerUserDetails(customer);
        var jwtToken = jwtService.generateToken(customerUserDetails);
        return AuthenticationReponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthenticationReponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );

        Optional<Admin> adminOptional = adminRepository.findByUserName(authenticationRequest.getUsername());
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            var customerUserDetails = new CustomerUserDetails(admin);
            var jwtToken = jwtService.generateToken(customerUserDetails);
            return AuthenticationReponse.builder()
                    .token(jwtToken)
                    .id(admin.getId())
                    .role("ROLE_ADMIN")
                    .build();
        }
        Optional<Customer> customerOptional = customerRepository.findByUserName(authenticationRequest.getUsername());
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            var customerUserDetails = new CustomerUserDetails(customer);
            var jwtToken = jwtService.generateToken(customerUserDetails);
            return AuthenticationReponse.builder()
                    .token(jwtToken)
                    .role("ROLE_USER")
                    .cartId(customer.getCart().getId())
                    .id(customer.getId())
                    .build();
        }
        throw new UsernameNotFoundException(authenticationRequest.getUsername());
    }

}
