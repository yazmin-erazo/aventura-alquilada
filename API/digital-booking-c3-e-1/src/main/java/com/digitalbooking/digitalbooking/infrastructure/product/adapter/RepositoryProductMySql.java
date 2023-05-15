package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryProductMySql extends JpaRepository< ProductEntity, Long > {
}
