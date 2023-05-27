package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RepositoryProductMySql extends JpaRepository< ProductEntity, Long > {

    List<ProductEntity> findAllByIsDelete(Boolean isDelete);

    Optional<ProductEntity> findByIdAndIsDelete(Long id, Boolean isDelete);

    Optional<ProductEntity> findByName(String name);

}
