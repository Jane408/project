package com.dmv.beecommerce.invoice;


import com.dmv.beecommerce.invoice_details.InvoiceDetailsRequestDto;

import java.util.List;

public record InvoiceRequestDto(
        Integer customerId,
        List<InvoiceDetailsRequestDto> invoiceDetailsRequestDtos
){
}
