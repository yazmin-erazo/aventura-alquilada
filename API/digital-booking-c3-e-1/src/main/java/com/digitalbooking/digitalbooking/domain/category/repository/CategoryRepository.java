package com.digitalbooking.digitalbooking.domain.category.repository;

import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;

import java.util.List;
import java.util.Optional;


public interface CategoryRepository {

    Long save(Category category, String imageURL);

    String saveImage(String fileName, String image);

    Optional<CategoryDTO> findById(Long id);

    List<CategoryDTO> getAll();

    void deleteCategory(Long id);

    boolean hasProducts(Long id);
}
