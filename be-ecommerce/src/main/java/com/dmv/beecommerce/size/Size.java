package com.dmv.beecommerce.size;

import com.dmv.beecommerce.inventory.Inventory;
import com.dmv.beecommerce.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @OneToMany(mappedBy = "size")
    private Set<Inventory> inventories;

}
