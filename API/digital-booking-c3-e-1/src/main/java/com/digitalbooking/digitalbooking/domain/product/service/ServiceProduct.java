package com.digitalbooking.digitalbooking.domain.product.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceProduct {

    @Autowired
    RepositoryProduct repositoryProduct;

    @Autowired
    CategoryRepository categoryRepository;

    public Long createProduct(Product product) throws Exception {
        Optional<CategoryDTO> category = categoryRepository.findById(product.getCategory().getId());
        category.orElseThrow(() -> new ExceptionInvalidValue("category not found"));
        repositoryProduct.findByName(product.getName()).ifPresent(productDTO -> {throw new ExceptionInvalidValue("El nombre del producto: "+productDTO.getName()+", ya existe");});
        String imageURL = repositoryProduct.saveImage(String.format("%s%s%s",product.getName().trim().replace(" ",""),product.getBrand().replace(" ",""),product.getFileName().trim().replace(" ","")), product.getImage());
        return repositoryProduct.save(product,imageURL);
    }

    public String updateProduct(Product product) throws Exception {
        Optional<CategoryDTO> category = categoryRepository.findById(product.getCategory().getId());
        category.orElseThrow(() -> new ExceptionInvalidValue("category not found"));

        repositoryProduct.updateProduct(product);

        return "Producto actualizado correctamente";
    }

    public List<ProductDTO> getProducts(){
        return repositoryProduct.getAll();
    }

    public ProductDTO getProduct(Long id) {
        return repositoryProduct.findById(id);
    }

    public String deleteProduct(Product product){
        repositoryProduct.deleteProduct(product.getId());
        return "Producto eliminado correctamente";
    }
}
