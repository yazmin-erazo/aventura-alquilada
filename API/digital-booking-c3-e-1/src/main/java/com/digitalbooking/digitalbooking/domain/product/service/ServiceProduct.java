package com.digitalbooking.digitalbooking.domain.product.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceProduct {

    @Autowired
    RepositoryProduct repositoryProduct;

    @Autowired
    CategoryRepository categoryRepository;

    public Long createProduct(Product product){
        Optional<CategoryDTO> category = categoryRepository.findById(product.getCategory().getId());
        category.orElseThrow(() -> new ExceptionInvalidValue("category not found"));
        repositoryProduct.findByName(product.getName()).ifPresent(productDTO -> {throw new ExceptionInvalidValue("El nombre del producto: "+productDTO.getName()+", ya existe");});
        String mainImageURL = repositoryProduct.saveImage(String.format("%s%s%s",product.getName().trim().replace(" ",""),product.getBrand().replace(" ",""),product.getFileName().trim().replace(" ","")), product.getImage());
        List<String> secundaryImages = product.getImageProducts().stream().map(imageProduct -> repositoryProduct.saveImage(String.format("%s%s%s",product.getName().trim().replace(" ",""),product.getBrand().replace(" ",""),imageProduct.getFileName().trim().replace(" ","")), imageProduct.getImage())).collect(Collectors.toList());
        return repositoryProduct.save(product,mainImageURL,secundaryImages);
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
