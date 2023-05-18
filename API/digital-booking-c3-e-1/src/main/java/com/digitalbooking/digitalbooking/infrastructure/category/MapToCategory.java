package com.digitalbooking.digitalbooking.infrastructure.category;

import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.infrastructure.category.adapter.CategoryEntity;
import org.springframework.beans.BeanUtils;

public class MapToCategory {

    public static CategoryDTO mapToCategory(CategoryEntity categoryEntity){
        CategoryDTO categoryDTO = new CategoryDTO();
        BeanUtils.copyProperties(categoryEntity,categoryDTO);
        return categoryDTO;
    }

}
