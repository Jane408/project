package com.dmv.beecommerce.inventory;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final InventoryMapper inventoryMapper;

    public List<InventoryResponseDto> getInventory() {
        List<Inventory> inventories = inventoryRepository.findAll();
        return inventories.stream().map(inventoryMapper::inventoryResponseDto).collect(Collectors.toList());
    }

    public void updateQuantity(InventoryUpdateDto inventoryUpdateDto, Integer id) {
       Inventory inventory = inventoryRepository.findById(id).get();
        inventoryMapper.toInventory(inventoryUpdateDto, inventory);
        inventoryRepository.save(inventory);
    }


}
