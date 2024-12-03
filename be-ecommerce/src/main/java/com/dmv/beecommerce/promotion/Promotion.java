package com.dmv.beecommerce.promotion;

import com.dmv.beecommerce.promotion_product.PromotionProduct;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private int discountPercentage;
    private LocalDate startDate;
    private LocalDate endDate;

    @OneToMany(mappedBy = "promotion")
    private Set<PromotionProduct> promotionProducts;
}
