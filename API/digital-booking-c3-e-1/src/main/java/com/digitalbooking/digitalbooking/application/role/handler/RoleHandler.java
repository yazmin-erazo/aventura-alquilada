package com.digitalbooking.digitalbooking.application.role.handler;

import com.digitalbooking.digitalbooking.application.role.request.CommandCreateRole;
import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import com.digitalbooking.digitalbooking.domain.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class RoleHandler {

    @Autowired
    RoleService roleService;

    public Long createRole(CommandCreateRole roleRequest) throws Exception {
        return roleService.createRole(Role.create(roleRequest.getName(),
                                                    roleRequest.getCategoryList(),
                                                    roleRequest.getCategoryCreate(),
                                                    roleRequest.getCategoryUpdate(),
                                                    roleRequest.getCategoryDelete(),
                                                    roleRequest.getProductList(),
                                                    roleRequest.getProductCreate(),
                                                    roleRequest.getProductUpdate(),
                                                    roleRequest.getProductDelete(),
                                                    roleRequest.getUserList(),
                                                    roleRequest.getUserCreate(),
                                                    roleRequest.getUserUpdate(),
                                                    roleRequest.getUserDelete(),
                                                    roleRequest.getRoleList(),
                                                    roleRequest.getRoleCreate(),
                                                    roleRequest.getRoleUpdate(),
                                                    roleRequest.getRoleDelete(),
                                                    roleRequest.getRentList(),
                                                    roleRequest.getRentCreate(),
                                                    roleRequest.getRentUpdate(),
                                                    roleRequest.getRentDelete())
        );
    }


}
