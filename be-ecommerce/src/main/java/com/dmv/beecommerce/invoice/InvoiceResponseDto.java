package com.dmv.beecommerce.invoice;

import com.dmv.beecommerce.invoice_details.InvoiceDetailsDto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record InvoiceResponseDto(
        Integer id,
        LocalDate orderDate,
        BigDecimal totalAmount,
        String status,
        String fullName,
        String address,
        List<InvoiceDetailsDto> invoiceDetailsDtos
) {
}
