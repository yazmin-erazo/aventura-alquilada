package com.digitalbooking.digitalbooking.domain.role.repository;


import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.role.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleRepository {

    Optional<RoleDTO> findByIdAndIsDelete(Long id);

    Optional<RoleDTO> findByNameAndIsDelete(String name);

   void updateRole(Role role);

    void deleteRole(Long id);

    Long createRole(Role role);

    List<RoleDTO> getAll();



}
