package com.dmv.beecommerce.customer;


import com.dmv.beecommerce.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByUserName(String userName);


}
