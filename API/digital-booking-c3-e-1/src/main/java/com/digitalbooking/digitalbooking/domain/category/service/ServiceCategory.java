package com.digitalbooking.digitalbooking.domain.category.service;

import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCategory {

    @Autowired
    CategoryRepository categoryRepository;

    public List<CategoryDTO> getCategories() {
        return categoryRepository.getAll();
    }
}
