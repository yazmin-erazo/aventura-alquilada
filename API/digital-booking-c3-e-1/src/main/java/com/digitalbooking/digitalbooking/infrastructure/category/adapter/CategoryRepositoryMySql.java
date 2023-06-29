package com.digitalbooking.digitalbooking.infrastructure.category.adapter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepositoryMySql extends JpaRepository<CategoryEntity, Long > {
   List<CategoryEntity> findAllByIsDelete(Boolean isDelete);
   Optional<CategoryEntity> findByIdAndIsDelete(Long id, Boolean isDelete);
   Optional<CategoryEntity> findByName(String name);
   boolean hasProducts(Long id);
}
