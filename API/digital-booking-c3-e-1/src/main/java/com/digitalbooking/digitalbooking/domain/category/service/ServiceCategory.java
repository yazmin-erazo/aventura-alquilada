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
<<<<<<< HEAD

    public Optional<CategoryDTO> getCategory(Long id) {
        return categoryRepository.findById(id);
    }

    public String deleteCategory(Category category) throws Exception {
        categoryRepository.deleteCategory(category.getId());
        return "Categoría eliminada correctamente";
    }
=======
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50
}
