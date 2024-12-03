package com.dmv.beecommerce.admin;

import com.dmv.beecommerce.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByUserName(String userName);
}
