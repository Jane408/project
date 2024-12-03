package com.dmv.beecommerce.product_category;

import org.springframework.stereotype.Service;

@Service
public class ProductCategoryMapper {
    public ProductCategoryResponseDto productCategoryReponseDto(ProductCategory productCategory) {
        return new ProductCategoryResponseDto(productCategory.getId(), productCategory.getName());
    }

}
