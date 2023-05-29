package com.digitalbooking.digitalbooking.domain.role.service;

import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public Long createRole(Role role){
        return roleRepository.createRole(role);
    }
}
