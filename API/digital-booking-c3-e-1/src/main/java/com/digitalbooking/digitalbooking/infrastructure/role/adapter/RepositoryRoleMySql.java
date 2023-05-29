package com.digitalbooking.digitalbooking.infrastructure.role.adapter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RepositoryRoleMySql extends JpaRepository<RoleEntity, Long > {

    List<RoleEntity> findAllByIsDelete(Boolean isDelete);

    Optional<RoleEntity> findByIdAndIsDelete(Long id, Boolean isDelete);

    Optional<RoleEntity> findByName(String name);

}
