package com.digitalbooking.digitalbooking.infrastructure.role.adapter;


import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import com.digitalbooking.digitalbooking.infrastructure.role.MapToRole;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class RoleRepositoryImpl implements RoleRepository {

    @Autowired
    RepositoryRoleMySql repositoryRoleMySql;

    @Override
    public Optional<RoleDTO> findByIdAndIsDelete(Long id) {
        return repositoryRoleMySql.findByIdAndIsDelete(id, false).map(MapToRole::mapToRole);
    }

    @Override
    public Optional<RoleDTO> findByNameAndIsDelete(String name) {
        return repositoryRoleMySql.findByNameAndIsDelete(name, false).map(MapToRole::mapToRole);
    }

    @Override
    public void updateRole(Role role) {
        RoleEntity roleEntity = new RoleEntity();
        BeanUtils.copyProperties(role,roleEntity);
        repositoryRoleMySql.save(roleEntity);
    }

    @Override
    public void deleteRole(Long id) {
        RoleEntity roleEntity = repositoryRoleMySql.findByIdAndIsDelete(id, Boolean.FALSE).orElseThrow(()->new ExceptionNullValue("Rol no encontrado"));
        roleEntity.setIsDelete(Boolean.TRUE);
        repositoryRoleMySql.save(roleEntity);
    }

    @Override
    public Long createRole(Role role) {
        RoleEntity roleEntity = new RoleEntity();
        BeanUtils.copyProperties(role,roleEntity);
        return repositoryRoleMySql.save(roleEntity).getId();
    }

    @Override
    public List<RoleDTO> getAll() {
        return repositoryRoleMySql.findAllByIsDelete(false).stream().map(MapToRole::mapToRole).collect(Collectors.toList());
    }

}
