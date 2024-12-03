package com.dmv.beecommerce.product_category;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductCategoryService {
    private ProductCategoryRepository productCategoryRepository;
    private ProductCategoryMapper productCategoryMapper;

    public List<ProductCategoryResponseDto> getAllProductCategory() {
        return productCategoryRepository.findAll()
                .stream()
                .map(productCategoryMapper::productCategoryReponseDto)
                .collect(Collectors.toList());
    }

}
