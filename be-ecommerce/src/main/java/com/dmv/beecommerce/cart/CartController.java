package com.dmv.beecommerce.cart;

import com.dmv.beecommerce.cart_details.CartDetailsRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@AllArgsConstructor
public class CartController {
    private final CartService cartService;
    private final CartRepository cartRepository;
    private final CartDetailsRepository cartDetailsRepository;

    @GetMapping("/carts/{cartId}")
    public CartResponseDto getCarts(@PathVariable Integer cartId) {
        return cartService.getProductFromCart(cartId);
    }
    @Transactional
    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<String> clearCartDetailsFromCart(@PathVariable Integer cartId) {
       if(cartService.clearAllProductCartDetails(cartId))
           return ResponseEntity.status(HttpStatus.OK).body("Cart details have been cleared");
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart details could not be cleared or cart not found");
    }

    @DeleteMapping("/cart/{cartId}/{cartdetailsId}")
    public ResponseEntity<String> deleteProductFromCartDetalis(@PathVariable Integer cartId, @PathVariable Integer cartdetailsId) {
        if(cartService.deleteProductCartDetails(cartId, cartdetailsId)){
            return ResponseEntity.status(HttpStatus.OK).body("Product from cart details has been deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product from cart details could not be deleted");
    }
}
