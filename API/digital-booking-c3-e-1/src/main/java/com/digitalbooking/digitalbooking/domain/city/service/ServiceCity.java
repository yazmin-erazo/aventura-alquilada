package com.digitalbooking.digitalbooking.domain.city.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import com.digitalbooking.digitalbooking.domain.city.entity.City;
import com.digitalbooking.digitalbooking.domain.city.repository.RepositoryCity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceCity {

    @Autowired
    RepositoryCity repositoryCity;

    public Long createCity(City city){
        repositoryCity.findByName(city.getName()).ifPresent(cityDTO -> {throw new ExceptionInvalidValue("El nombre de la ciudad: "+cityDTO.getName()+", ya existe");});
        repositoryCity.findByCodeAndCountryCode(city.getCode(), city.getCountryCode()).ifPresent(cityDTO -> {throw new ExceptionInvalidValue("Ya existe una ciudad asociada al país y al código de ciudad indicado");});
        return repositoryCity.save(city);
    }

    public String updateCity(City city) throws Exception {
        repositoryCity.findByName(city.getName())
                .ifPresent(cityDTO -> {
                    if (cityDTO.getId() != city.getId()){
                        throw new ExceptionInvalidValue("El nombre de la ciudad: "+cityDTO.getName()+", ya existe");
                    }
        });

        repositoryCity.findByCodeAndCountryCode(city.getCode(), city.getCountryCode())
                .ifPresent(cityDTO -> {
                    if (cityDTO.getCode() != city.getCode() &&
                            cityDTO.getCountryCode() != city.getCountryCode()){
                        throw new ExceptionInvalidValue("Ya existe una ciudad asociada al país y al código de ciudad indicado");
                    }
                });

        repositoryCity.updateCity(city);

        return "Ciudad actualizada correctamente";
    }

    public List<CityDTO> getCities(){
        return repositoryCity.getAll();
    }

    public CityDTO getCity(Long id) {
        return repositoryCity.findById(id);
    }

    public Optional<CityDTO> getCity(String name) {
        return repositoryCity.findByName(name);
    }

    public Optional<CityDTO> getCity(String code, String countryCode) {
        return repositoryCity.findByCodeAndCountryCode(code, countryCode);
    }

    public String deleteCity(City city){
        repositoryCity.deleteCity(city.getId());
        return "Ciudad eliminada correctamente";
    }
}
