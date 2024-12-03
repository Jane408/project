package com.dmv.beecommerce.cart;

import com.dmv.beecommerce.cart_details.CartDetails;
import com.dmv.beecommerce.customer.Customer;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @OneToMany(mappedBy = "cart")
    private Set<CartDetails> cartDetails;

}
