package com.digitalbooking.digitalbooking.domain.product.service;

import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceProduct {

    @Autowired
    RepositoryProduct repositoryProduct;

    @Autowired
    CategoryRepository categoryRepository;

    public Long createProduct(Product product) throws Exception {
        var category = categoryRepository.findById(product.getCategory().getId());
        category.orElseThrow(() -> new Exception("category not found"));
        return repositoryProduct.save(product);
    }

}
