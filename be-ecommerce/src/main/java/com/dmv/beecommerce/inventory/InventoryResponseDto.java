package com.dmv.beecommerce.inventory;

public record InventoryResponseDto(
        Integer inventoryId,
        Integer productId,
        Integer sizeId,
        int quantity,
        String sizeName,
        String productName
) {
}
