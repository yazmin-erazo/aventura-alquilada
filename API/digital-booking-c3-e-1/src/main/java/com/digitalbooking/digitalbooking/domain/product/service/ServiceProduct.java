package com.digitalbooking.digitalbooking.domain.product.service;

import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceProduct {

    @Autowired
    RepositoryProduct repositoryProduct;

    public Long createProduct(Product product){
        return repositoryProduct.save(product);
    }

}
