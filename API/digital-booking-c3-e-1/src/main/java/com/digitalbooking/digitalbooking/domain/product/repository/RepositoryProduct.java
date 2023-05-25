package com.digitalbooking.digitalbooking.domain.product.repository;


import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;

import java.util.List;
import java.util.Optional;

public interface RepositoryProduct {

    Long save(Product product, String imageURL, List<String> secundaryImages);

    String saveImage(String fileName, String image);

    List<ProductDTO> getAll();

    ProductDTO findById(Long id);

    Optional<ProductDTO> findByName(String name);

    void deleteProduct(Long id);
}
