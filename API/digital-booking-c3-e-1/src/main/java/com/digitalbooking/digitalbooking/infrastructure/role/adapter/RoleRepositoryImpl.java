package com.digitalbooking.digitalbooking.infrastructure.role.adapter;


import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RoleRepositoryImpl implements RoleRepository {

    @Autowired
    RepositoryRoleMySql repositoryRoleMySql;

    @Override
    public Long createRole(Role role) {
        RoleEntity roleEntity = new RoleEntity();
        BeanUtils.copyProperties(role,roleEntity);
        return repositoryRoleMySql.save(roleEntity).getId();
    }
}
