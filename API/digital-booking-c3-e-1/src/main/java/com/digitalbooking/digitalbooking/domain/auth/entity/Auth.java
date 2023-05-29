package com.digitalbooking.digitalbooking.domain.auth.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final  class Auth {
    private String email;
    private String password;

    public static Auth create(String email, String password){
        Validator.validateMandatory(email, "El email es requerido para loguearse");
        Validator.validateMandatory(password, "El password es requerido para loguearse");

        return new Auth(email, password);
    }
}
