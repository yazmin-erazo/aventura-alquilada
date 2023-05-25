package com.digitalbooking.digitalbooking.domain.category.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class Category {
    private Long id;
    private String name;
    private String description;
    private String imageURL;
    private String fileName;

    public Category(String name, String imageURL, String description) {
    }

    public static Category create(Long id) throws Exception {
        return new Category(id, "", "", "", "");
    }

    public static Category create(String name, String imageURL, String description, String fileName) throws Exception {
        Validator.validateMandatory(name, "El nombre es requerido para crear una categoría.");
        Validator.validateMandatory(imageURL, "La imagen es requerida para crear una categoría.");
        Validator.validateMandatory(description, "La descripción es requerida para crear una categoría.");
        Validator.validateMandatory(fileName, "El nombre del archivo es requerido para crear una categoría.");

        return new Category(name, imageURL, description);
    }

    public static Category reBuild(Long id, String name, String imageURL, String description, String fileName)  {
        return new Category(id, name, imageURL, description, fileName);
    }
}
