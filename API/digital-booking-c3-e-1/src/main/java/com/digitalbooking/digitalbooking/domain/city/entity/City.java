package com.digitalbooking.digitalbooking.domain.city.entity;


import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
public final class City {
    private Long id;
    private String name;
    private String code;
    private String countryCode;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String genericName;

    private City(Long id) {
        this.id = id;
    }

    private City(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static City create(String name,
                                 String code,
                                 String countryCode,
                                 BigDecimal latitude,
                                 BigDecimal longitude,
                                 String genericName) throws Exception {
        Validator.validateMandatory(name, "El nombre es requerido para crear una ciudad");
        Validator.validateMandatory(code, "El codigo es requerido para crear una ciudad");
        //Validator.validateMandatory(countryCode, "El codigo de pais es requerido para crear una ciudad");
        Validator.validateMandatory(latitude, "La latitud es requerida para crear una ciudad");
        Validator.validateMandatory(longitude, "La longitud es requerida para crear una ciudad");
        //Validator.validateMandatory(genericName, "El nombre genérico para crear una ciudad");

        return new City(0L,name,code,countryCode,latitude,longitude, genericName);
    }

    public static City update(Long id,
                                 String name) throws Exception {
        Validator.validateMandatory(id, "El Id es requerido para actualizar la ciudad");
        Validator.validateMandatory(name, "El nombre es requerido para actualizar la ciudad");

        return new City(id, name);
    }

    public static City createById(Long id){
        Validator.validateMandatory(id, "El Id es requerido para eliminar una ciudad");
        return new City(id);
    }
}
