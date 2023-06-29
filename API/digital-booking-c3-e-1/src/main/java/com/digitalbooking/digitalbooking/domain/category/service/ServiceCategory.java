package com.digitalbooking.digitalbooking.domain.category.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceCategory {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    RepositoryProduct repositoryProduct;

    public Long createCategory(Category category) throws Exception{
        String imageURL = categoryRepository.saveImage(String.format("%s%s",category.getName().trim().replace(" ",""),category.getFileName().replace(" ","").trim()), category.getImage());
        return categoryRepository.save(category, imageURL);

    }

    public List<CategoryDTO> getCategories() {
        return categoryRepository.getAll();
    }

    public Optional<CategoryDTO> getCategory(Long id) {
        return categoryRepository.findById(id);
    }

    public String deleteCategory(Category category) throws Exception {
        categoryRepository.findById(category.getId()).orElseThrow(() -> new ExceptionNullValue("Categoría no encontrada"));
        if(ObjectUtils.isNotEmpty(repositoryProduct.findAllByIdCategoryAndIsDelete(category.getId()))){
            throw  new ExceptionInvalidValue("No se puede eliminar una categoría con productos asignados activos");
        }
        categoryRepository.deleteCategory(category.getId());
        return "Categoría eliminada correctamente";
    }
}
