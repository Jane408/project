package com.dmv.beecommerce.promotion_product;

import org.springframework.stereotype.Service;

@Service
public class PromotionProductMapper {
    public PromotionProductDto toPromotionProductDto(PromotionProduct promotionProduct) {
        return new PromotionProductDto(promotionProduct.getPromotion().getDiscountPercentage());
    }
}
