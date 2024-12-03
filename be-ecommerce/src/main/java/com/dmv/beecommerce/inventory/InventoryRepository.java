package com.dmv.beecommerce.inventory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Inventory findByProductIdAndSizeName(Integer productId, String sizeName);
}
