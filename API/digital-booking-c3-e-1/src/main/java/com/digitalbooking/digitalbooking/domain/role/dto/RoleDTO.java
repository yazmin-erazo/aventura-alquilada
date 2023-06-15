package com.digitalbooking.digitalbooking.domain.role.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDTO {

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
}
