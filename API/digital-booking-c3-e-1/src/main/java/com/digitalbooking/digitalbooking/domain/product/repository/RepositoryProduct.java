package com.digitalbooking.digitalbooking.domain.product.repository;


import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;

import java.util.List;

public interface RepositoryProduct {

    Long save(Product product, String imageURL);

    String saveImage(String fileName, String image);

    List<ProductDTO> getAll();

    ProductDTO findById(Long id);

    void deleteProduct(Long id);
}
