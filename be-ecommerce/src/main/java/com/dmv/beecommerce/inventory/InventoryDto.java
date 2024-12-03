package com.dmv.beecommerce.inventory;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryDto {
    private String sizeName;
    private int quantity;
}
