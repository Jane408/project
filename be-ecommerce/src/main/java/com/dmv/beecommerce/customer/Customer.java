package com.dmv.beecommerce.customer;
import com.dmv.beecommerce.auth.Role;
import com.dmv.beecommerce.cart.Cart;
import com.dmv.beecommerce.invoice.Invoice;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fullName;
    private String phoneNumber;
    private String address;
    @Column(unique = true)
    private String userName;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "customer")
    private Set<Invoice> invoices;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "customer")
    private Cart cart;
}
