package com.dmv.beecommerce.cart_details;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
public class CartDetailsController {
    private final CartDetailsService cartDetailsService;
    private final CartDetailsRepository cartDetailsRepository;

    @PostMapping("/cartdetails")
    public void updateCartDetails(@RequestBody CartDetailsRequestDto cartDetailsRequestDto) {
        cartDetailsService.updateProductCartDetails(cartDetailsRequestDto);
    }

    @PostMapping("/cart/{cartId}/{cartdetailsId}")
    public ResponseEntity<String> deleteProductFromCartDetails(@PathVariable Integer cartId, @PathVariable Integer cartdetailsId) {
        Optional<CartDetails> cartDetails = cartDetailsRepository.findById(cartdetailsId);
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();
            if (cartDetail.getCart().getId().equals(cartId)) {
                cartDetailsRepository.deleteById(cartdetailsId);
                return ResponseEntity.ok("Deleted product from cart");
            }else{
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Product does not belong to this cart");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No cartdetails found");
    }


}
