package com.dmv.beecommerce.invoice_details;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDetailsDto {
    private String productName;
    private int quantity;
    private BigDecimal price;
    private String sizeName;
}
