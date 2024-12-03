package com.dmv.beecommerce.product;

import com.dmv.beecommerce.inventory.Inventory;
import com.dmv.beecommerce.inventory.InventoryDto;

import com.dmv.beecommerce.inventory.InventoryMapper;
import com.dmv.beecommerce.product_category.ProductCategory;

import com.dmv.beecommerce.promotion_product.PromotionProductDto;
import com.dmv.beecommerce.promotion_product.PromotionProductMapper;
import com.dmv.beecommerce.size.Size;
import com.dmv.beecommerce.size.SizeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductMapper {
    private final PromotionProductMapper promotionProductMapper;
    private final InventoryMapper inventoryMapper;
    private final SizeRepository sizeRepository;


    public ProductResponseDto toProductReponseDto(Product product) {
        Set<PromotionProductDto> promotionProductDtos = product.getPromotionProducts()
                .stream()
                .map(promotionProductMapper::toPromotionProductDto)
                .collect(Collectors.toSet());
        Set<InventoryDto> inventoryDtos = product.getInventories()
                .stream()
                .map(inventoryMapper::toInventoryDto)
                .collect(Collectors.toSet());
        return new ProductResponseDto(product.getId(), product.getName(), product.getPrice(),
                product.getProductCategory().getName(), product.getAddDate(),promotionProductDtos, inventoryDtos);
    }

    public Product toProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setAddDate(productDto.getAddDate());
        ProductCategory productCategory = new ProductCategory();
        productCategory.setId(productDto.getCategory().getId());
        product.setProductCategory(productCategory);
        Set<Inventory> inventories = new HashSet<>();

        for (InventoryDto inventoryDto : productDto.getInventoriesDtos()) {
            Inventory inventory = new Inventory();
            inventory.setQuantity(inventoryDto.getQuantity());


            Size size = sizeRepository.findByName(inventoryDto.getSizeName());
            if (size != null) {
                inventory.setSize(size);
            } else {
                throw new IllegalArgumentException("Size không tồn tại: " + inventoryDto.getSizeName());
            }
            inventory.setProduct(product);
            inventories.add(inventory);
        }

        product.setInventories(inventories);
        return product;
    }

    public void updateProductFromDto(Product product, ProductDto productDto) {
        if(productDto.getName() != null){
            product.setName(productDto.getName());
        }
        if(productDto.getPrice() != null){
            product.setPrice(productDto.getPrice());
        }
        if(productDto.getAddDate() != null) {
            product.setAddDate(productDto.getAddDate());
        }
        if(productDto.getCategory() != null){
            ProductCategory productCategory = new ProductCategory();
            productCategory.setId(productDto.getCategory().getId());
            product.setProductCategory(productCategory);
        }
    }

}
