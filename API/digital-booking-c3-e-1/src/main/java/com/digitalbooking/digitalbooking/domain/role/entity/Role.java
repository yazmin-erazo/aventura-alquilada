package com.digitalbooking.digitalbooking.domain.role.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Getter
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PRIVATE)
public class Role {
    private Long id;
    private String name;
    private Boolean categoryList;
    private Boolean categoryCreate;
    private Boolean categoryUpdate;
    private Boolean categoryDelete;
    private Boolean productList;
    private Boolean productCreate;
    private Boolean productUpdate;
    private Boolean productDelete;
    private Boolean userList;
    private Boolean userCreate;
    private Boolean userUpdate;
    private Boolean userDelete;
    private Boolean roleList;
    private Boolean roleCreate;
    private Boolean roleUpdate;
    private Boolean roleDelete;
    private Boolean rentList;
    private Boolean rentCreate;
    private Boolean rentUpdate;
    private Boolean rentDelete;

    public static Role create(String name,
                                 Boolean categoryList,
                                 Boolean categoryCreate,
                                 Boolean categoryUpdate,
                                 Boolean categoryDelete,
                                 Boolean productList,
                                 Boolean productCreate,
                                 Boolean productUpdate,
                                 Boolean productDelete,
                                 Boolean userList,
                                 Boolean userCreate,
                                 Boolean userUpdate,
                                 Boolean userDelete,
                                 Boolean roleList,
                                 Boolean roleCreate,
                                 Boolean roleUpdate,
                                 Boolean roleDelete,
                                 Boolean rentList,
                                 Boolean rentCreate,
                                 Boolean rentUpdate,
                                 Boolean rentDelete) {
        Validator.validateMandatory(name, "El nombre es requerido para crear un producto");

        return new Role(0L,
                name,
                categoryList,
                categoryCreate,
                categoryUpdate,
                categoryDelete,
                productList,
                productCreate,
                productUpdate,
                productDelete,
                userList,
                userCreate,
                userUpdate,
                userDelete,
                roleList,
                roleCreate,
                roleUpdate,
                roleDelete,
                rentList,
                rentCreate,
                rentUpdate,
                rentDelete);
    }

}
