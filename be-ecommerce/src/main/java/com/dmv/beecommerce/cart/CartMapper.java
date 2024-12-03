package com.dmv.beecommerce.cart;

import com.dmv.beecommerce.cart_details.CartDetailsDto;
import com.dmv.beecommerce.cart_details.CartDetailsMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CartMapper {
    private final CartDetailsMapper cartDetailsMapper;
    public CartResponseDto toCartResponseDto(Cart cart) {
        Set<CartDetailsDto> cartDetailsDtos=  cart.getCartDetails()
                .stream()
                .map(cartDetailsMapper::toCartDetailsDto)
                .collect(Collectors.toSet());
        return new CartResponseDto(cartDetailsDtos);
    }
}
