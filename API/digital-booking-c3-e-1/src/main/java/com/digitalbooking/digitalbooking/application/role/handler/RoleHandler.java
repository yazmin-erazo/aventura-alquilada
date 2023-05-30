package com.digitalbooking.digitalbooking.application.role.handler;

import com.digitalbooking.digitalbooking.application.role.request.CommandCreateRole;
import com.digitalbooking.digitalbooking.application.role.request.CommandUpdateRole;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import com.digitalbooking.digitalbooking.domain.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


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
                roleRequest.getRoleList(),
                roleRequest.getRoleCreate(),
                roleRequest.getRoleUpdate(),
                roleRequest.getRoleDelete(),
                roleRequest.getRoleList(),
                roleRequest.getRoleCreate(),
                roleRequest.getRoleUpdate(),
                roleRequest.getRoleDelete(),
                roleRequest.getRentList(),
                roleRequest.getRentCreate(),
                roleRequest.getRentUpdate(),
                roleRequest.getRentDelete()));
    }


    public String updateRole(CommandUpdateRole updateRole) throws Exception {
        return roleService.updateRole(Role.update(updateRole.getIdRole(),
                updateRole.getName(),
                updateRole.getCategoryList(),
                updateRole.getCategoryCreate(),
                updateRole.getCategoryUpdate(),
                updateRole.getCategoryDelete(),
                updateRole.getProductList(),
                updateRole.getProductCreate(),
                updateRole.getProductUpdate(),
                updateRole.getProductDelete(),
                updateRole.getRoleList(),
                updateRole.getRoleCreate(),
                updateRole.getRoleUpdate(),
                updateRole.getRoleDelete(),
                updateRole.getRoleList(),
                updateRole.getRoleCreate(),
                updateRole.getRoleUpdate(),
                updateRole.getRoleDelete(),
                updateRole.getRentList(),
                updateRole.getRentCreate(),
                updateRole.getRentUpdate(),
                updateRole.getRentDelete()));
    }
    public String deleteRole(Long id) {
        return roleService.deleteRole(Role.createById(id));
    }

    public RoleDTO findById(Long id) {
        return roleService.getRole(id);
    }

    public List<RoleDTO> getRoles() {
        return roleService.getRoles();
    }
}
