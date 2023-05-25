package com.digitalbooking.digitalbooking.domain.category.service;

import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceCategory {

    @Autowired
    CategoryRepository categoryRepository;

    public Long createCategory(Category category) {
        String imageURL = categoryRepository.saveImage(category.getFileName(), category.getImageURL());
        return categoryRepository.save(category, imageURL);

    }

    public List<CategoryDTO> getCategories() {
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(Long id) {
        return categoryRepository.findById(id);
    }
}
