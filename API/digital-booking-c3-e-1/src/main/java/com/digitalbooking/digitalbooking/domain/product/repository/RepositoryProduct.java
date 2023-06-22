package com.digitalbooking.digitalbooking.domain.product.repository;


import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.CommentProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RepositoryProduct {

    Long save(Product product, String imageURL, List<String> secondaryImages);

    void updateProduct(Product product);

    String saveImage(String fileName, String image);

    List<ProductDTO> getAll(String brandFilter, String nameFilter, String genderFilter, BigDecimal priceLessThan, BigDecimal priceGreaterThan, String sizeFilter, String stateFilter, String colorFilter, String materialFilter, Long cityId, Date startDate, Date endDate, String search);

    ProductDTO findById(Long id);

    Optional<ProductDTO> findByIdAndDatesRents( Long id, Date startDate, Date endDate);

    Optional<ProductDTO> findByNameAndIsDelete(String name);

    Optional<ProductDTO> findByIdAndIsDelete(Long id);

    void deleteProduct(Long id);

    void createComment(CommentProduct commentProduct, Long userId);
}
