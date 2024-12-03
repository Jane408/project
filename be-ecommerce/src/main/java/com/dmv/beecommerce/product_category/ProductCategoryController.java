package com.dmv.beecommerce.product_category;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;

    @GetMapping("/categories")
    public List<ProductCategoryResponseDto> findAllProductCategory() {
        return productCategoryService.getAllProductCategory();
    }

}
