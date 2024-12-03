package com.dmv.beecommerce.invoice;

import com.dmv.beecommerce.inventory.Inventory;
import com.dmv.beecommerce.inventory.InventoryRepository;
import com.dmv.beecommerce.invoice_details.InvoiceDetails;
import com.dmv.beecommerce.invoice_details.InvoiceDetailsDto;
import com.dmv.beecommerce.invoice_details.InvoiceDetailsMapper;
import com.dmv.beecommerce.invoice_details.InvoiceDetailsRepository;
import com.dmv.beecommerce.product.Product;
import com.dmv.beecommerce.product.ProductRepository;
import com.dmv.beecommerce.size.Size;
import com.dmv.beecommerce.size.SizeRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.Sides;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final InvoiceDetailsRepository invoiceDetailsRepository;
    private final ProductRepository productRepository;
    private final SizeRepository sizeRepository;
    private final InventoryRepository inventoryRepository;
    public List<InvoiceResponseDto> invoiceResponseDtos(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null){
            List<Invoice> invoices = invoiceRepository.findByCustomerUserName(authentication.getName());
            return invoices.stream()
                    .map(invoiceMapper::toInvoiceResponseDto)
                    .collect(Collectors.toList());
        }
        return null;
    }

    public List<InvoiceResponseDto> allInvoiceResponseDtos(){
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoices.stream()
                .map(invoiceMapper::toInvoiceResponseDto)
                .collect(Collectors.toList());
    }

    public InvoiceStatsDto statsResponseDto(){
        Long total = invoiceRepository.countByStatus("Đã hoàn thành");
        BigDecimal totalRevenue = invoiceRepository.getTotalAmount("Đã hoàn thành");
        return invoiceMapper.toInvoiceStatsDto(total, totalRevenue);
    }

    public void updateStatusInvoice(InvoiceDto invoiceDto, Integer id){
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(()->new RuntimeException("Invoice not found"));
        invoiceMapper.toInvoice(invoice, invoiceDto);
        invoiceRepository.save(invoice);
        if("Đã hoàn thành".equalsIgnoreCase(invoice.getStatus())){
           updateInventoryOnCompletion(id);
        }
    }

    public void createInvoice(InvoiceRequestDto invoiceRequestDto){
        invoiceRepository.save(invoiceMapper.toInvoice(invoiceRequestDto));
    }

    public void updateInventoryOnCompletion(Integer invoiceId) {
        List<InvoiceDetails> invoiceDetails = invoiceDetailsRepository.findByInvoiceId(invoiceId);
        for(InvoiceDetails invoiceDetail : invoiceDetails) {
            Product product = productRepository.findById(invoiceDetail.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            Size size = sizeRepository.findByName(invoiceDetail.getSizeName());
            if(size == null){
                throw new RuntimeException("Size not found");
            }
            Inventory inventory = inventoryRepository.findByProductIdAndSizeName(product.getId(), size.getName());
            if(inventory == null){
                throw new RuntimeException("Inventory not found");
            }
            inventory.setQuantity(inventory.getQuantity() - invoiceDetail.getQuantity());
            inventoryRepository.save(inventory);
        }
    }


}
