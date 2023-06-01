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
    private String image;
    private String fileName;

    private  Category(String name, String image, String description, String fileName) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.fileName = fileName;
    }

    private Category(Long id) {
        this.id = id;
    }

    public static Category create(Long id) {
        return new Category(id, "", "", "", "");
    }

    public static Category create(String name, String image, String description, String fileName)  {
        Validator.validateMandatory(name, "El nombre es requerido para crear una categoría");
        Validator.validateMandatory(image, "La imagen es requerida para crear una categoría");
        Validator.validateMandatory(description, "La descripción es requerida para crear una categoría");
        Validator.validateMandatory(fileName, "El nombre del archivo es requerido para crear una categoría");
        Validator.validateMaxLength(description, 255, "La descripción no puede contener más de 255 carácteres");

        return new Category(name, image, description,fileName);
    }

    public static Category reBuild(Long id, String name, String image, String description)  {
        return new Category(id, name, description, image, "");
    }

    public static Category createById(Long id) {
        Validator.validateMandatory(id, "El Id es requerido para eliminar una categoría.");
        return new Category(id);
    }
}
