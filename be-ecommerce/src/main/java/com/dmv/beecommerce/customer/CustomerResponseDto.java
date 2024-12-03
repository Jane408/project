package com.dmv.beecommerce.customer;

import jakarta.persistence.Column;

public record CustomerResponseDto(
        Integer id,
        String fullName,
        String phoneNumber,
        String address,
        String userName,
        String password
) {
}
