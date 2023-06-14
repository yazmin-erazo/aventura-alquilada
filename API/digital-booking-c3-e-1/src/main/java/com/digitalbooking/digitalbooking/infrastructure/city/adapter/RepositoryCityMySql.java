package com.digitalbooking.digitalbooking.infrastructure.city.adapter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RepositoryCityMySql extends JpaRepository<CityEntity, Long> {

    List<CityEntity> findAll();

    Optional<CityEntity> findById(Long id);

    Optional<CityEntity> findByName(String name);

    Optional<CityEntity> findByCodeAndCountryCode(String code, String countryCode);



}
