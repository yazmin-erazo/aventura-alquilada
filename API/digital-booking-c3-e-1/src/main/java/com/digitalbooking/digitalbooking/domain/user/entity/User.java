package com.digitalbooking.digitalbooking.domain.user.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class User {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Boolean isActive;

    private User(Long id) {
        this.id = id;
    }

    public static User create(String name,
                                 String lastName,
                                 String email,
                                 String password
                                ) throws Exception {
        Validator.validateMandatory(name, "El nombre es requerido para crear un usuario");
        Validator.validateMandatory(lastName, "El apellido es requerido para crear un usuario");
        Validator.validateMandatory(email, "El correo electrónico es requerido para crear un usuario");
        Validator.validateEmailFormat(email, "El formato del correo electrónico no es válido");
        Validator.validateMandatory(password, "La contraseña es requerida para crear un usuario");

        return new User(0L,name,lastName,email,password,false);
    }

}
