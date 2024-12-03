package com.dmv.beecommerce.invoice;

import com.dmv.beecommerce.customer.Customer;
import com.dmv.beecommerce.customer.CustomerRepository;
import com.dmv.beecommerce.invoice_details.InvoiceDetails;
import com.dmv.beecommerce.invoice_details.InvoiceDetailsDto;
import com.dmv.beecommerce.invoice_details.InvoiceDetailsMapper;
import com.dmv.beecommerce.product.Product;
import com.dmv.beecommerce.product.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InvoiceMapper {
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final InvoiceDetailsMapper invoiceDetailsMapper;
    public InvoiceResponseDto toInvoiceResponseDto(Invoice invoice) {
        List<InvoiceDetailsDto> invoiceDetailsDtos = invoice.getInvoiceDetails()
                .stream()
                .map(invoiceDetailsMapper::toInvoiceDetailDto)
                .collect(Collectors.toList());
        return new InvoiceResponseDto(invoice.getId(), invoice.getOrderDate(), invoice.getTotalAmount(),
                invoice.getStatus(), invoice.getCustomer().getFullName(),
                invoice.getCustomer().getAddress(), invoiceDetailsDtos);
    }

    public InvoiceStatsDto toInvoiceStatsDto(
            Long total,
            BigDecimal revenue
    ) {
        return new InvoiceStatsDto(total, revenue);
    }

    public void toInvoice(Invoice invoice, InvoiceDto invoiceDto) {
        if (invoiceDto.getStatus() != null){
            invoice.setStatus(invoiceDto.getStatus());
        }
    }

    public Invoice toInvoice(InvoiceRequestDto invoiceRequestDto) {
        Customer customer = customerRepository.findById(invoiceRequestDto.customerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        BigDecimal totalPrice = invoiceRequestDto.invoiceDetailsRequestDtos()
                .stream()
                .map(invoiceDetailsRequestDto -> invoiceDetailsRequestDto.totalPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        Invoice newInvoice = Invoice.builder()
                .totalAmount(totalPrice)
                .orderDate(LocalDate.now())
                .customer(customer)
                .status("Chờ xử lý")
                .build();
        Set<InvoiceDetails> invoiceDetails = invoiceRequestDto.invoiceDetailsRequestDtos()
                .stream().
                map(invoiceDetailsRequestDto->{
                    Product product = productRepository.findById(invoiceDetailsRequestDto.productId())
                            .orElseThrow(() -> new RuntimeException("Product not found"));
                    return InvoiceDetails.builder()
                            .product(product)
                            .quantity(invoiceDetailsRequestDto.quantity())
                            .totalPrice(invoiceDetailsRequestDto.totalPrice())
                            .sizeName(invoiceDetailsRequestDto.sizeName())
                            .invoice(newInvoice)
                            .build();
                })
                .collect(Collectors.toSet());
        newInvoice.setInvoiceDetails(invoiceDetails);
        return newInvoice;
    }
}
