package com.digitalbooking.digitalbooking.domain.product.entity;


import com.digitalbooking.digitalbooking.common.validations.Validator;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

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
    private String image;
    private String fileName;
    private String color;
    private String material;
    private List<ImageProduct> imageProducts;
    private Product(Long id) {
        this.id = id;
    }

    private Product(Long id, Category category) {
        this.id = id;
        this.category = category;
    }

    public static Product create(String name,
                                 String brand,
                                 String state,
                                 BigDecimal price,
                                 String description,
                                 String size,
                                 String gender,
                                 BigDecimal deposit,
                                 Long idCategory,
                                 String image,
                                 String fileName,
                                 String color,
                                 String material,
                                 List<ImageProduct> imageProducts) throws Exception {
        Validator.validateMandatory(name, "El nombre es requerido para crear un producto");
        Validator.validateMandatory(brand, "La marca es requerida para crear un producto");
        Validator.validateMandatory(state, "El estado es requerido para crear un producto");
        Validator.validateMandatory(price, "El precio es requerido para crear un producto");
        Validator.validateMandatory(description, "La descripción es requerida para crear un producto");
        Validator.validateMandatory(size, "La talla es requerida para crear un producto");
        //Validator.validateMandatory(gender, "El género es requerido para crear un producto");
        Validator.validateMandatory(color, "El color es requerido para crear un producto");
        Validator.validateMandatory(material, "El material es requerido para crear un producto");
        //Validator.validateMandatory(deposit, "El depósito es requerido para crear un producto");
        Validator.validateMandatory(image, "La imagen es requerida para crear un producto");
        Validator.validateMandatory(fileName, "El nombre del archivo es requerido para crear un producto");
        Validator.validateGreater(price, BigDecimal.valueOf(0), "El precio debe ser mayor que cero");
        //Validator.validateGreater(deposit, BigDecimal.valueOf(0), "El deposito debe ser mayor que cero");

        Category category = Category.create(idCategory);
        return new Product(0L,name,brand,state,price,description,size,gender, deposit, category, image, fileName, color, material, imageProducts);
    }

    public static Product update(Long id,
                                 Long idCategory) throws Exception {
        Validator.validateMandatory(id, "El Id es requerido para actualizar el producto");
        Validator.validateMandatory(idCategory, "La categoría es requerida para actualizar el producto");

        Category category = Category.create(idCategory);
        return new Product(id, category);
    }

    public static Product createById(Long id){
        Validator.validateMandatory(id, "El Id es requerido para eliminar un producto");
        return new Product(id);
    }
}
