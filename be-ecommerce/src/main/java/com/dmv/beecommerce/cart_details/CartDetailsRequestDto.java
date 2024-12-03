package com.dmv.beecommerce.cart_details;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CartDetailsRequestDto(
        @NotNull
        Integer cartId,
        @NotNull
        Integer productId,
        @NotNull
        @Positive
        int quantity
) {
}
