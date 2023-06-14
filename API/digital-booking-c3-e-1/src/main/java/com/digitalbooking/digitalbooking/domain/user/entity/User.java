package com.digitalbooking.digitalbooking.domain.user.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;
import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Random;

import static com.digitalbooking.digitalbooking.common.Constants.colors;
import static lombok.AccessLevel.PRIVATE;


@Getter
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PRIVATE)
public final class User {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Boolean isActive;
    private Role role;
    private String initialsColor;

    private User(Long id) {
        this.id = id;
    }

    public static User create(String name,
                                 String lastName,
                                 String email,
                                 String password) throws Exception {
        Validator.validateMandatory(name, "El nombre es requerido para crear un usuario");
        Validator.validateMandatory(lastName, "El apellido es requerido para crear un usuario");
        Validator.validateMandatory(email, "El correo electrónico es requerido para crear un usuario");
        Validator.validateEmailFormat(email, "El formato del correo electrónico no es válido");
        Validator.validateMandatory(password, "La contraseña es requerida para crear un usuario");
        Validator.validateMinLength(name, 3, "El nombre debe contener al menos 3 caracteres");
        Validator.validateMinLength(lastName, 3, "El apellido debe contener al menos 3 caracteres");
        Validator.validateOnlyChars(name, "El nombre debe contener solo letras");
        Validator.validateOnlyChars(lastName, "El apellido debe contener solo letras");
        //Validator.validatePassword(password, "La contraseña debe tener al menos 3 caracteres, al menos una letra mayúscula, una letra minúscula y un número");

        Role role1 = Role.createById(21L);
        Random random = new Random();
        int index = random.nextInt(colors.length);
        return new User(0L,name,lastName,email,password,false,role1, colors[index]);
    }

    public static User createById(Long id){
        Validator.validateMandatory(id, "El Id del usuario es requerido");
        return new User(id);
    }

}
