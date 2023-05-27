package com.digitalbooking.digitalbooking.domain.user.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;




import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.Valid;

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
        Validator.validateMinLength(name, 4, "El nombre debe contener al menos 4 caracteres");
        Validator.validateMinLength(lastName, 4, "El apellido debe contener al menos 4 caracteres");
        Validator.validateOnlyChars(name, "El nombre debe contener solo letras");
        Validator.validateOnlyChars(lastName, "El apellido debe contener solo letras");
        Validator.validatePassword(password, "La contraseña debe tener al menos 3 caracteres, al menos una letra mayúscula, una letra minúscula y un número");
        return new User(0L,name,lastName,email,password,false);
    }

}
