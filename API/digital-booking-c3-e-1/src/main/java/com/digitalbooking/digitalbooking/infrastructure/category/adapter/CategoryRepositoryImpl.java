package com.digitalbooking.digitalbooking.infrastructure.category.adapter;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.infrastructure.category.MapToCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository {
    @Autowired
    CategoryRepositoryMySql categoryRepositoryMySql;
    @Override
<<<<<<< HEAD
    public Long save(Category category, String imageURL) {
        CategoryEntity categoryEntity = new CategoryEntity();
        BeanUtils.copyProperties(category, categoryEntity);
        categoryEntity.setImageURL(imageURL);
        categoryEntity.setIsDelete(false);
        return categoryRepositoryMySql.save(categoryEntity).getId();
    }

    @Override
    public String saveImage(String fileName, String image) {
        return productS3.saveImage(String.format("category/%s",fileName), image);
    }

    @Override
    public Optional<CategoryDTO> findById(Long id) {
=======
    public Optional<Category> findById(Long id) {
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50
        Optional<CategoryEntity> category = categoryRepositoryMySql.findById(id);
        return category.map(c -> Category.reBuild(c.getId(), c.getName(), c.getImageURL()));
    }

    @Override
    public List<CategoryDTO> getAll() {
        return categoryRepositoryMySql.findAll().stream().map(MapToCategory::mapToCategory).collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(Long id) {
        CategoryEntity categoryEntity = categoryRepositoryMySql.findByIdAndIsDelete(id, Boolean.FALSE).orElseThrow(() -> new ExceptionNullValue("Categoría no encontrada"));
        categoryEntity.setIsDelete(Boolean.TRUE);
        categoryRepositoryMySql.save(categoryEntity);
    }
}
