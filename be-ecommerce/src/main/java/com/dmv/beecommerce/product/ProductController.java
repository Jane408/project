package com.dmv.beecommerce.product;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/products")
    public List<ProductResponseDto> findAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/search")
    public List<ProductResponseDto> findProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String categoryName
    ) {
        if(name != null){
            return productService.searchProductsByName(name);
        }else if(categoryName != null){
            return productService.searchProductsByCategory(categoryName);
        }
        return new ArrayList<>();
    }

    @GetMapping("/products/paged")
    public Page<ProductResponseDto> pagedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ){
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductResponseDto> productResponseDtoPage = productService.getAllProducts(pageable);
        return productResponseDtoPage;
    }

    @GetMapping("/products/{id}")
    public ProductResponseDto findProductsById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @PostMapping("/products")
    public void addProduct(@RequestBody ProductDto productDto) {
        productService.addProduct(productDto);
    }

    @PutMapping("/products/{id}")
    public void updateProduct(@PathVariable Integer id, @RequestBody ProductDto productDto) {
        productService.updateProduct(id, productDto);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProuductById(id);
    }
}
