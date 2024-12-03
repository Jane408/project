package com.dmv.beecommerce.cart;

import com.dmv.beecommerce.cart_details.CartDetails;
import com.dmv.beecommerce.cart_details.CartDetailsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {
    private final CartMapper cartMapper;
    private final CartRepository cartRepository;
    private final CartDetailsRepository cartDetailsRepository;
    public CartResponseDto getProductFromCart(Integer cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(()->new RuntimeException("Cart not found"));
        return cartMapper.toCartResponseDto(cart);
    }

    public boolean clearAllProductCartDetails(Integer cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isPresent()) {
            cartDetailsRepository.deleteAllByCart(cart.get());
            return true;
        }
        return false;

    }

    public boolean deleteProductCartDetails(Integer cartId, Integer cartdetailsId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isPresent()) {
            Optional<CartDetails> cartDetails = cartDetailsRepository.findById(cartdetailsId);
            if (cartDetails.isPresent() && cartDetails.get().getCart().getId().equals(cartId)) {
                cartDetailsRepository.deleteById(cartdetailsId);
                return true;
            }
        }
        return false;
    }
}
