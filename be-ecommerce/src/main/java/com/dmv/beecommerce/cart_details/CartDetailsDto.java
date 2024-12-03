package com.dmv.beecommerce.cart_details;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDetailsDto {
    private Integer id;
    private Long totalQuantity;
    private Integer productId;
    private String productName;
    private BigDecimal productPrice;
    private int productQuantity;
}
