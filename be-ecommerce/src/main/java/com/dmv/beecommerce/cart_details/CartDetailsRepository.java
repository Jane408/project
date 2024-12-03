package com.dmv.beecommerce.cart_details;

import com.dmv.beecommerce.cart.Cart;
import com.dmv.beecommerce.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartDetailsRepository extends JpaRepository<CartDetails, Integer> {
    Optional<CartDetails> findCartDetailsByCartAndProduct(Cart cart, Product product);
    @Modifying
    @Query("DELETE FROM CartDetails cd WHERE cd.cart = :cart")
    void deleteAllByCart(@Param("cart") Cart cart);

    @Query("SELECT SUM(cd.quantity) FROM CartDetails cd WHERE cd.cart.id = :cartId")
    Long countProductByCart(@Param("cartId") Integer cartId);
}
