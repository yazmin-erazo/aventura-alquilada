package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.infrastructure.category.adapter.CategoryEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryProductImpl implements RepositoryProduct {
    @Autowired
    RepositoryProductMySql repositoryProductMySql;
    @Override
    public Long save(Product product) {
        ProductEntity productEntity = new ProductEntity();
        BeanUtils.copyProperties(product,productEntity);
        CategoryEntity category = new CategoryEntity();
        category.setId(product.getCategory().getId());
        productEntity.setCategory(category);
        return repositoryProductMySql.save(productEntity).getId();
    }
}
