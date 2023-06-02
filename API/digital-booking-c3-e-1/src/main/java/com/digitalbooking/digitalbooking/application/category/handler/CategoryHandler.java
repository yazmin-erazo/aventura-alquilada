package com.digitalbooking.digitalbooking.application.category.handler;

import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.service.ServiceCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryHandler {

    @Autowired
    ServiceCategory serviceCategory;

    public List<CategoryDTO> getCategories() {
        return serviceCategory.getCategories();
    }

<<<<<<< HEAD
    public Optional<CategoryDTO> findById(Long id) {
        return serviceCategory.getCategory(id);
    }

    public String deleteCategory(Long id) throws Exception{
        return serviceCategory.deleteCategory(Category.createById(id));
    }
=======
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50
}
