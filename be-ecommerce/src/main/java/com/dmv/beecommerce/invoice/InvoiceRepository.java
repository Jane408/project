package com.dmv.beecommerce.invoice;

import com.dmv.beecommerce.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    List<Invoice> findByCustomerUserName(String userName);
    Long countByStatus(String status);
    @Query("SELECT SUM (i.totalAmount) FROM Invoice i WHERE i.status = :status")
    BigDecimal getTotalAmount(@Param("status") String status);
}
