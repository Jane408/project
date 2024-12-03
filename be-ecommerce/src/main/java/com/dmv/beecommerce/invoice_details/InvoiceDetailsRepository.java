package com.dmv.beecommerce.invoice_details;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Integer> {
    List<InvoiceDetails> findByInvoiceId(Integer invoiceId);
}
