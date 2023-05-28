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

}
