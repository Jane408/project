package com.dmv.beecommerce.product;

import com.dmv.beecommerce.inventory.Inventory;
import com.dmv.beecommerce.inventory.InventoryDto;
import com.dmv.beecommerce.product_category.ProductCategoryDto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    @NotNull
    private String name;
    @NotNull
    private LocalDate addDate;
    @NotNull
    @Positive
    private BigDecimal price;
    private ProductCategoryDto category;
    private Set<InventoryDto> inventoriesDtos;
}
