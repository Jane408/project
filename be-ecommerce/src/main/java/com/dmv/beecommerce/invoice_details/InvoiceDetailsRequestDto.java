package com.dmv.beecommerce.invoice_details;

import java.math.BigDecimal;

public record InvoiceDetailsRequestDto(
        Integer productId,
        int quantity,
        BigDecimal totalPrice,
        String sizeName
) {
}
