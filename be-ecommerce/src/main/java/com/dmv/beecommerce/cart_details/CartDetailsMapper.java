package com.dmv.beecommerce.cart_details;

import com.dmv.beecommerce.cart.Cart;
import com.dmv.beecommerce.cart.CartRepository;
import com.dmv.beecommerce.product.Product;
import com.dmv.beecommerce.product.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CartDetailsMapper {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private  final CartDetailsRepository cartDetailsRepository;

    public CartDetails toCartDetails(CartDetailsRequestDto cartDetailsRequestDto) {
        Cart cart = cartRepository.findById(cartDetailsRequestDto.cartId())
                .orElseThrow(()->new RuntimeException("Cart not found"));
        Product product = productRepository.findById(cartDetailsRequestDto.productId())
                .orElseThrow(()->new RuntimeException("Product not found"));
        Optional<CartDetails> cartDetails = cartDetailsRepository.findCartDetailsByCartAndProduct(cart, product);
        if (cartDetails.isPresent()) {
            CartDetails cartDetail = cartDetails.get();
            int quantityToAdd = cartDetailsRequestDto.quantity();
            cartDetail.setQuantity(cartDetail.getQuantity() + quantityToAdd);
            return cartDetail;
        }
        CartDetails newCartDetail = CartDetails.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(cartDetailsRequestDto.quantity())
                    .build();
        return newCartDetail;
    }

    public CartDetailsDto toCartDetailsDto(CartDetails cartDetails) {
        Long totalQuantityProduct = cartDetailsRepository.countProductByCart(cartDetails.getCart().getId());
        CartDetailsDto cartDetailsDto = CartDetailsDto.builder()
                .id(cartDetails.getId())
                .productName(cartDetails.getProduct().getName())
                .productId(cartDetails.getProduct().getId())
                .totalQuantity(totalQuantityProduct)
                .productPrice(cartDetails.getProduct().getPrice())
                .productQuantity(cartDetails.getQuantity())
                .build();
        return cartDetailsDto;
    }

}
