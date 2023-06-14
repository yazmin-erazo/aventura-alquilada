package com.digitalbooking.digitalbooking.domain.city.repository;


import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import com.digitalbooking.digitalbooking.domain.city.entity.City;

import java.util.List;
import java.util.Optional;

public interface RepositoryCity {

    Long save(City city);
    void updateCity(City city);

    List<CityDTO> getAll();

    CityDTO findById(Long id);

    Optional<CityDTO> findByName(String name);

    Optional<CityDTO> findByCodeAndCountryCode(String code, String countryCode);

    void deleteCity(Long id);
}
