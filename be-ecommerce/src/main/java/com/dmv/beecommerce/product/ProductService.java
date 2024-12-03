package com.dmv.beecommerce.product;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;
    private ProductMapper productMapper;

    public void addProduct(ProductDto productDto) {
        productRepository.save(productMapper.toProduct(productDto));
    }
    public List<ProductResponseDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toProductReponseDto)
                .collect(Collectors.toList());
    }

    public ProductResponseDto getProductById(Integer productId) {
        Product product = productRepository.findAllById(productId);
        return productMapper.toProductReponseDto(product);
    }

    public List<ProductResponseDto> searchProductsByName(String keyword) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(keyword);
        return products.stream()
                .map(productMapper::toProductReponseDto)
                .collect(Collectors.toList());
    }

    public List<ProductResponseDto> searchProductsByCategory(String categoryName) {
        List<Product> products = productRepository.findByProductCategoryNameContainingIgnoreCase(categoryName);
        return products.stream()
                .map(productMapper::toProductReponseDto)
                .collect(Collectors.toList());
    }

    public Page<ProductResponseDto> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return products.map(productMapper::toProductReponseDto);
    }

    public void updateProduct(Integer id, ProductDto productDto){
        Product product = productRepository.findById(id).get();
        productMapper.updateProductFromDto(product, productDto);
        productRepository.save(product);
    }

    public void deleteProuductById(Integer id) {
        productRepository.deleteById(id);
    }
}
