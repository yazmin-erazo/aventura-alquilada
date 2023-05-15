package com.digitalbooking.digitalbooking.infrastructure.category.adapter;

import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository {
    @Autowired
    CategoryRepositoryMySql categoryRepositoryMySql;
    @Override
    public Optional<Category> findById(Long id) {
        Optional<CategoryEntity> category = categoryRepositoryMySql.findById(id);
        return category.map(c -> Category.reBuild(c.getId(), c.getName()));
    }
}
