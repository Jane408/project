package com.dmv.beecommerce.inventory;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryUpdateDto {
    private Integer productId;
    private Integer sizeId;
    private int quantity;
}
