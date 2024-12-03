package com.dmv.beecommerce.invoice;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDto {
    @NotNull
    private String status;
}
