package com.digitalbooking.digitalbooking.domain.product.repository;


import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface RepositoryProduct {

    Long save(Product product, String imageURL, List<String> secondaryImages);

    void updateProduct(Product product);

    String saveImage(String fileName, String image);

    List<ProductDTO> getAll(String brandFilter, String nameFilter, String genderFilter, BigDecimal priceLessThan, BigDecimal priceGreaterThan, String sizeFilter, String stateFilter, String colorFilter, String materialFilter);

    ProductDTO findById(Long id);

    Optional<ProductDTO> findByNameAndIsDelete(String name);

    void deleteProduct(Long id);
}
