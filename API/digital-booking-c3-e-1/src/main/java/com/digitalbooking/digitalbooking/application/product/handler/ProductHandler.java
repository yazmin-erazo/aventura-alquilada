package com.digitalbooking.digitalbooking.application.product.handler;

import com.digitalbooking.digitalbooking.application.product.request.CommandCreateProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.service.ServiceProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductHandler {

    @Autowired
    ServiceProduct serviceProduct;

    public Long createProduct(CommandCreateProduct createProduct) throws Exception {
        return serviceProduct.createProduct(Product.create(createProduct.getName(), createProduct.getBrand(), createProduct.getState(), createProduct.getPrice(), createProduct.getDescription(), createProduct.getSize(), createProduct.getGender(),createProduct.getDeposit(),createProduct.getIdCategory()));
    }

}
