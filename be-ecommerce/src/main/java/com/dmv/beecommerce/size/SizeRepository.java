package com.dmv.beecommerce.size;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size, Integer> {
    Size findByName(String name);
}
