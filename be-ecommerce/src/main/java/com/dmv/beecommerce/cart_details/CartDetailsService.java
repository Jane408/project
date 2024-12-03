package com.dmv.beecommerce.cart_details;

import com.dmv.beecommerce.cart.Cart;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CartDetailsService {
    private final CartDetailsRepository cartDetailsRepository;
    private final CartDetailsMapper cartDetailsMapper;

    public void updateProductCartDetails(CartDetailsRequestDto cartDetailsRequestDto) {
        CartDetails cartDetails = cartDetailsMapper.toCartDetails(cartDetailsRequestDto);
        cartDetailsRepository.save(cartDetails);
    }



}
