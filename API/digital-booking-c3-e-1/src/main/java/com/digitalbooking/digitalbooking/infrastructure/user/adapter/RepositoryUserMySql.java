package com.digitalbooking.digitalbooking.infrastructure.user.adapter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RepositoryUserMySql extends JpaRepository< UserEntity, Long > {


    Optional<UserEntity> findById(Long id);

    Optional<UserEntity> findByEmail(String email);

}
