package com.dmv.beecommerce.product;

import com.dmv.beecommerce.inventory.InventoryDto;
import com.dmv.beecommerce.inventory.InventoryUpdateDto;
import com.dmv.beecommerce.promotion_product.PromotionProductDto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public record ProductResponseDto(
        Integer id,
        String name,
        BigDecimal price,
        String nameCategory,
        LocalDate addDate,
        Set<PromotionProductDto> promotionProductDtos,
        Set<InventoryDto> inventoryDtos

) {
}
