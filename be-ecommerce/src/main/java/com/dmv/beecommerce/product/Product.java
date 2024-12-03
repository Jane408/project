package com.dmv.beecommerce.product;

import com.dmv.beecommerce.cart_details.CartDetails;
import com.dmv.beecommerce.inventory.Inventory;
import com.dmv.beecommerce.invoice_details.InvoiceDetails;
import com.dmv.beecommerce.product_category.ProductCategory;

import com.dmv.beecommerce.promotion_product.PromotionProduct;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private LocalDate addDate;
    private BigDecimal price;

    @OneToMany(mappedBy = "product")
    private Set<InvoiceDetails> invoiceDetails;

    @ManyToOne
    @JoinColumn(name ="category_id")
    private ProductCategory productCategory;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Inventory> inventories;

    @OneToMany(mappedBy = "product")
    private Set<PromotionProduct> promotionProducts;
    @OneToMany(mappedBy = "product")
    private Set<CartDetails> cartDetails;

}
