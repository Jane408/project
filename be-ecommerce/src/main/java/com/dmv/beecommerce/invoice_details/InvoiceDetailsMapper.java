package com.dmv.beecommerce.invoice_details;

import org.springframework.stereotype.Service;

@Service
public class InvoiceDetailsMapper {
    public InvoiceDetailsDto toInvoiceDetailDto(InvoiceDetails invoiceDetails) {
        return new InvoiceDetailsDto(invoiceDetails.getProduct().getName(), invoiceDetails.getQuantity(),
                invoiceDetails.getTotalPrice(), invoiceDetails.getSizeName());
    }
}
