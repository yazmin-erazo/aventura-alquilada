package com.digitalbooking.digitalbooking.infrastructure.category.adapter;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepositoryMySql extends JpaRepository<CategoryEntity, Long > {
}
