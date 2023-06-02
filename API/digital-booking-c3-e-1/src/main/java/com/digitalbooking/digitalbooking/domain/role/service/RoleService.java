package com.digitalbooking.digitalbooking.domain.role.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public String deleteRole(Role role){
        roleRepository.deleteRole(role.getId());
        return "Rol eliminado correctamente";
    }

    public Long createRole(Role role){
        return roleRepository.createRole(role);
    }

    public String updateRole(Role role) throws Exception {
        roleRepository.findByIdAndIsDelete(role.getId()).orElseThrow(()->new ExceptionNullValue("Rol no encontrado"));
        roleRepository.updateRole(role);
        return "Rol actualizado correctamente";
    }

    public List<RoleDTO> getRoles(){
        return roleRepository.getAll();
    }

    public RoleDTO getRole(Long id) {
        return roleRepository.findByIdAndIsDelete(id).orElseThrow(()->new ExceptionNullValue("Rol no encontrado"));
    }

    public RoleDTO getRoleByName(String name) {
        return roleRepository.findByNameAndIsDelete(name).orElseThrow(()->new ExceptionNullValue("Rol no encontrado"));
    }
}
