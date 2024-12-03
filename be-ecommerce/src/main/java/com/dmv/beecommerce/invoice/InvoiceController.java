package com.dmv.beecommerce.invoice;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;

    @GetMapping("/invoice")
    public List<InvoiceResponseDto> getInvoices() {
        return invoiceService.invoiceResponseDtos();
    }

    @GetMapping("/invoices")
    public List<InvoiceResponseDto> getAllInvoices() {
        return invoiceService.allInvoiceResponseDtos();
    }

    @GetMapping("/invoices/summary")
    public InvoiceStatsDto countInvoicesAndRevenues() {
        return invoiceService.statsResponseDto();
    }

    @PutMapping("/invoices/{id}")
    public void updateStatusInvoice(@PathVariable Integer id, @RequestBody InvoiceDto invoiceDto) {
        invoiceService.updateStatusInvoice(invoiceDto, id);
    }

    @PostMapping("/invoice/creates")
    public void createInvoice(@RequestBody InvoiceRequestDto invoiceRequestDto) {
        invoiceService.createInvoice(invoiceRequestDto);
    }
}
