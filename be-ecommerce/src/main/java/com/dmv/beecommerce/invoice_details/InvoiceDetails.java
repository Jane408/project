package com.dmv.beecommerce.invoice_details;

import com.dmv.beecommerce.invoice.Invoice;
import com.dmv.beecommerce.product.Product;
import com.dmv.beecommerce.size.Size;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int quantity;
    private BigDecimal totalPrice;
    private String sizeName;
    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
