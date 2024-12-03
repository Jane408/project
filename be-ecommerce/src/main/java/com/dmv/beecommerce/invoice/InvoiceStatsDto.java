package com.dmv.beecommerce.invoice;

import java.math.BigDecimal;

public record InvoiceStatsDto(
        Long invoiceTotal,
        BigDecimal revenue
) {
}
