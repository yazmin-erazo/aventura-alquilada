package com.digitalbooking.digitalbooking.infrastructure.city;

import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import com.digitalbooking.digitalbooking.infrastructure.city.adapter.CityEntity;
import org.springframework.beans.BeanUtils;

import java.util.stream.Collectors;

public class MapToCity {

    public static CityDTO mapToCity(CityEntity cityEntity){
        CityDTO city = new CityDTO();
        BeanUtils.copyProperties(cityEntity,city);
        return city;
    }

}
