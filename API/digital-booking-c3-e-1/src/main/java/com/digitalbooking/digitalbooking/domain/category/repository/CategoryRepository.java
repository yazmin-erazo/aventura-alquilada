package com.digitalbooking.digitalbooking.domain.category.repository;

import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;

import java.util.List;
import java.util.Optional;


public interface CategoryRepository {

    Optional<Category> findById(Long id);

    List<CategoryDTO> getAll();
}
