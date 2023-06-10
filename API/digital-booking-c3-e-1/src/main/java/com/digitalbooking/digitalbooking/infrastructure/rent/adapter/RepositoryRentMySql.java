package com.digitalbooking.digitalbooking.infrastructure.rent.adapter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface RepositoryRentMySql extends JpaRepository<RentEntity, Long > {

    Optional<RentEntity> findByIdAndStateIn(Long id, Set<String> states);
}
