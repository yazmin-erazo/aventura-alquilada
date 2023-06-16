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

    private String icon;

    private  Category(String name, String image, String description, String fileName, String icon) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.fileName = fileName;
        this.icon = icon;
    }

    private Category(Long id) {
        this.id = id;
    }

    public static Category create(Long id) {
        return new Category(id, "", "", "", "", "");
    }

    public static Category create(String name, String image, String description, String fileName, String icon)  {
        Validator.validateMandatory(name, "El nombre es requerido para crear una categoría");
        Validator.validateMandatory(image, "La imagen es requerida para crear una categoría");
        Validator.validateMandatory(description, "La descripción es requerida para crear una categoría");
        Validator.validateMandatory(fileName, "El nombre del archivo es requerido para crear una categoría");
        Validator.validateMaxLength(description, 255, "La descripción no puede contener más de 255 carácteres");
        Validator.validateMandatory(icon, "El ícono es requerido para crear una categoría");

        return new Category(name, image, description,fileName, icon);
    }

    public static Category reBuild(Long id, String name, String image, String description, String icon)  {
        return new Category(id, name, description, image, "", icon);
    }

    public static Category createById(Long id) {
        Validator.validateMandatory(id, "El Id de la categoría es requerido");
        return new Category(id);
    }
}
