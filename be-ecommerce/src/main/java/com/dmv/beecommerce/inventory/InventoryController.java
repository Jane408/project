package com.dmv.beecommerce.inventory;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;
    @GetMapping("/inventories")
    public List<InventoryResponseDto> inventories() {
        return inventoryService.getInventory();
    }

    @PutMapping("/inventories/{id}")
    public void updateInventoryQuantity(@PathVariable Integer id, @RequestBody InventoryUpdateDto inventoryUpdateDto) {
        inventoryService.updateQuantity(inventoryUpdateDto, id);
    }
}
