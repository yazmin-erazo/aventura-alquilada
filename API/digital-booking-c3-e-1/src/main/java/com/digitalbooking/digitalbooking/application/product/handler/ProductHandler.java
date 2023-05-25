package com.digitalbooking.digitalbooking.application.product.handler;

import com.digitalbooking.digitalbooking.application.product.request.CommandCreateProduct;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.ImageProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.service.ServiceProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductHandler {

    @Autowired
    ServiceProduct serviceProduct;

    public Long createProduct(CommandCreateProduct createProduct) throws Exception {
        return serviceProduct.createProduct(Product.create(createProduct.getName(),
                createProduct.getBrand(),
                createProduct.getState(),
                createProduct.getPrice(),
                createProduct.getDescription(),
                createProduct.getSize(),
                createProduct.getGender(),
                createProduct.getDeposit(),
                createProduct.getIdCategory(),
                createProduct.getImage(),
                createProduct.getFileName(),
                createProduct.getColor(),
                createProduct.getMaterial(),
                createProduct.getSecundaryImages().stream().map(p -> ImageProduct.create(p.getImage(),p.getFileName())).collect(Collectors.toList())
        ));
    }

    public List<ProductDTO> getProduct() {
        return serviceProduct.getProducts();
    }

    public ProductDTO findById(Long id) {
        return serviceProduct.getProduct(id);
    }

    public String deleteProduct(Long id) {
        return serviceProduct.deleteProduct(Product.createById(id));
    }
}
