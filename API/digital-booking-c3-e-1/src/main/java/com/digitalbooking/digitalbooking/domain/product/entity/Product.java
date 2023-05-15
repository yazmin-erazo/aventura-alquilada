package com.digitalbooking.digitalbooking.domain.product.entity;


import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public final class Product {

    private Long id;
    private String name;
    private String brand;
    private String state;
    private BigDecimal price;
    private String description;
    private String size;
    private String gender;
    private BigDecimal deposit;
    private Category category;

    public static Product create(String name,
                                 String brand,
                                 String state,
                                 BigDecimal price,
                                 String description,
                                 String size,
                                 String gender,
                                 BigDecimal deposit,
                                 Long idCategory) throws Exception {
        //ValidadorArgumento.validarObligatorio(name, "El nombre es requerido para crear un producto");
        Category category = Category.create(idCategory);
        return new Product(0L,name,brand,state,price,description,size,gender, deposit, category);

    }

}
