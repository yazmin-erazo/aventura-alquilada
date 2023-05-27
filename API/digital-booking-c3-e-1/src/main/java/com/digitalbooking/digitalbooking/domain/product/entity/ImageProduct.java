package com.digitalbooking.digitalbooking.domain.product.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class ImageProduct {
    private Long id;
    private String image;
    private String fileName;
    private ImageProduct(String image, String fileName){
        this.image = image;
        this.fileName = fileName;
    }
    public static ImageProduct create(String image, String fileName){
        Validator.validateMandatory(image, "La imagen es requerida para crear un producto");
        Validator.validateMandatory(fileName, "El nombre del archivo es requerido para crear un producto");

        return new ImageProduct(image, fileName);
    }
}
