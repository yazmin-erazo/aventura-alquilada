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
    private Boolean cityList;
    private Boolean cityCreate;
    private Boolean cityUpdate;
    private Boolean cityDelete;
    private Boolean isDelete;


    public Role(Long id) {
        this.id = id;
    }


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
                              Boolean rentDelete,
                              Boolean cityList,
                              Boolean cityCreate,
                              Boolean cityUpdate,
                              Boolean cityDelete) {
        Validator.validateMandatory(name, "El nombre es requerido para crear un rol");

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
                rentDelete,
                cityList,
                cityCreate,
                cityUpdate,
                cityDelete,
                false);
    }

    public static Role update(Long id,
                              String name,
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
                              Boolean rentDelete,
                              Boolean cityList,
                              Boolean cityCreate,
                              Boolean cityUpdate,
                              Boolean cityDelete) {

        return new Role(id,
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
                rentDelete,
                cityList,
                cityCreate,
                cityUpdate,
                cityDelete,
                false);
    }

    public static Role createById(Long id) {
        Validator.validateMandatory(id, "El Id del rol es requerido");
        return new Role(id);
    }
}
