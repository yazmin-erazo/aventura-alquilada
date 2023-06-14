package com.digitalbooking.digitalbooking.infrastructure.city.adapter;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import com.digitalbooking.digitalbooking.domain.city.entity.City;
import com.digitalbooking.digitalbooking.domain.city.repository.RepositoryCity;
import com.digitalbooking.digitalbooking.infrastructure.city.MapToCity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class RepositoryCityImpl implements RepositoryCity {


    @Autowired
    RepositoryCityMySql repositoryCityMySql;
    @Override
    public Long save(City city) {
        CityEntity cityEntity = new CityEntity();
        BeanUtils.copyProperties(city,cityEntity);
        return repositoryCityMySql.save(cityEntity).getId();
    }

    @Override
    public void updateCity(City city){
        CityEntity cityEntity = repositoryCityMySql.findById(city.getId()).orElseThrow(()->new ExceptionNullValue("Ciudad no encontrada"));
        repositoryCityMySql.save(cityEntity);
    }

    @Override
    public List<CityDTO> getAll() {
        return repositoryCityMySql.findAll().stream().map(MapToCity::mapToCity).collect(Collectors.toList());
    }

    @Override
    public CityDTO findById(Long id) {
        return repositoryCityMySql.findById(id).map(MapToCity::mapToCity).orElseThrow(()->new ExceptionNullValue("Ciudad no encontrada"));
    }

    @Override
    public Optional<CityDTO> findByName(String name) {
        return repositoryCityMySql.findByName(name).map(MapToCity::mapToCity);
    }

    @Override
    public Optional<CityDTO> findByCodeAndCountryCode(String code, String countryCode) {
        return repositoryCityMySql.findByCodeAndCountryCode(code, countryCode).map(MapToCity::mapToCity);
    }

    @Override
    public void deleteCity(Long id) {
        CityEntity cityEntity = repositoryCityMySql.findById(id).orElseThrow(()->new ExceptionNullValue("Ciudad no encontrada"));
        repositoryCityMySql.delete(cityEntity);
    }
}
