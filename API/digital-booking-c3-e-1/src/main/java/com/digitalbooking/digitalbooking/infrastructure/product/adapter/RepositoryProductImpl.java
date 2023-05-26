package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.infrastructure.category.adapter.CategoryEntity;
import com.digitalbooking.digitalbooking.infrastructure.product.MapToProduct;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class RepositoryProductImpl implements RepositoryProduct {

    @Autowired
    ProductS3 productS3;
    @Autowired
    RepositoryProductMySql repositoryProductMySql;
    @Override
    public Long save(Product product, String imageURL) {
        ProductEntity productEntity = new ProductEntity();
        BeanUtils.copyProperties(product,productEntity);
        CategoryEntity category = new CategoryEntity();
        category.setId(product.getCategory().getId());
        productEntity.setCategory(category);
        productEntity.setImageURL(imageURL);
        productEntity.setIsDelete(Boolean.FALSE);
        return repositoryProductMySql.save(productEntity).getId();
    }

    @Override
    public void updateProduct(Product product){
        ProductEntity productEntity = repositoryProductMySql.findById(product.getId()).orElseThrow(()->new ExceptionNullValue("Producto no encontrado"));
        CategoryEntity category = new CategoryEntity();
        category.setId(product.getCategory().getId());
        productEntity.setCategory(category);
        repositoryProductMySql.save(productEntity);
    }

    @Override
    public String saveImage(String fileName, String image) {
        return productS3.saveImage(fileName, image);
    }

    @Override
    public List<ProductDTO> getAll() {
        return repositoryProductMySql.findAllByIsDelete(Boolean.FALSE).stream().map(MapToProduct::mapToProduct).collect(Collectors.toList());
    }

    @Override
    public ProductDTO findById(Long id) {
        return repositoryProductMySql.findByIdAndIsDelete(id,Boolean.FALSE).map(MapToProduct::mapToProduct).orElseThrow(()->new ExceptionNullValue("Producto no encontrado"));
    }

    @Override
    public Optional<ProductDTO> findByName(String name) {
        return repositoryProductMySql.findByName(name).map(MapToProduct::mapToProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        ProductEntity productEntity = repositoryProductMySql.findByIdAndIsDelete(id, Boolean.FALSE).orElseThrow(()->new ExceptionNullValue("Producto no encontrado"));
        productEntity.setIsDelete(Boolean.TRUE);
        repositoryProductMySql.save(productEntity);
    }
}
