package com.digitalbooking.digitalbooking.application.city.handler;

import com.digitalbooking.digitalbooking.application.city.request.CommandCreateCity;
import com.digitalbooking.digitalbooking.application.city.request.CommandUpdateCity;
import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import com.digitalbooking.digitalbooking.domain.city.entity.City;
import com.digitalbooking.digitalbooking.domain.city.service.ServiceCity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CityHandler {

    @Autowired
    ServiceCity serviceCity;

    public Long createCity(CommandCreateCity createCity) throws Exception {
        return serviceCity.createCity(City.create(createCity.getName(),
                createCity.getCode(),
                createCity.getCountryCode(),
                createCity.getLatitude(),
                createCity.getLongitude(),
                createCity.getGenericName()
        ));
    }

    public String updateCity(Long id, CommandUpdateCity updateCity) throws Exception {
        return serviceCity.updateCity(City.update(id, updateCity.getName()
        ));
    }

    public List<CityDTO> getCity() {
        return serviceCity.getCities();
    }

    public CityDTO findById(Long id) {
        return serviceCity.getCity(id);
    }

    public String deleteCity(Long id) {
        return serviceCity.deleteCity(City.createById(id));
    }
}
