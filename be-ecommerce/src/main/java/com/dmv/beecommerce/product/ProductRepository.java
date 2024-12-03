package com.dmv.beecommerce.product;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByProductCategoryNameContainingIgnoreCase(String categoryName);

    Product findAllById(Integer productId);
}
