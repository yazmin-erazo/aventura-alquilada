package com.digitalbooking.digitalbooking.application.category.handler;

import com.digitalbooking.digitalbooking.application.category.request.CommandCreateCategory;
import com.digitalbooking.digitalbooking.application.product.request.CommandCreateProduct;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.service.ServiceCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CategoryHandler {

    @Autowired
    ServiceCategory serviceCategory;

    public Long createCategory(CommandCreateCategory createCategory) throws Exception {
        return serviceCategory.createCategory(Category.create(
                createCategory.getName(),
                createCategory.getImage(),
                createCategory.getDescription(),
                createCategory.getFileName()

        ));
    }

    public List<CategoryDTO> getCategories() {
        return serviceCategory.getCategories();
    }

    public Optional<CategoryDTO> findById(Long id) {
        return serviceCategory.getCategory(id);
    }
}
