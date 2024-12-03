package com.dmv.beecommerce.cart;

import com.dmv.beecommerce.cart_details.CartDetails;
import com.dmv.beecommerce.cart_details.CartDetailsDto;

import java.util.Set;

public record CartResponseDto(
        Set<CartDetailsDto> cartDetailsDtos
) {
}
