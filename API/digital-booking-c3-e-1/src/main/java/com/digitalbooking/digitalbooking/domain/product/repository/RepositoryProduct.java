package com.digitalbooking.digitalbooking.domain.product.repository;


import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;

import java.util.List;

public interface RepositoryProduct {

<<<<<<< HEAD
    Long save(Product product, String imageURL, List<String> secondaryImages);

    void updateProduct(Product product);
=======
    Long save(Product product, String imageURL);
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50

    String saveImage(String fileName, String image);

    List<ProductDTO> getAll();

    ProductDTO findById(Long id);

    void deleteProduct(Long id);
}
