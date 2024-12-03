package com.dmv.beecommerce.inventory;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InventoryMapper {
    public InventoryResponseDto inventoryResponseDto(Inventory inventory) {
        return new InventoryResponseDto(inventory.getId(), inventory.getProduct().getId(),  inventory.getSize().getId(),inventory.getQuantity(), inventory.getSize().getName(),
                inventory.getProduct().getName());
    }

    public void toInventory(InventoryUpdateDto inventoryDto, Inventory inventory) {
        if(inventoryDto.getQuantity() > 0){
            inventory.setQuantity(inventoryDto.getQuantity());
        }
    }

    public InventoryDto toInventoryDto(Inventory inventory) {
        return new InventoryDto(inventory.getSize().getName(), inventory.getQuantity());
    }
}
