package com.digitalbooking.digitalbooking.domain.city.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityDTO {

    private Long id;
    private String name;
    private String code;
    private String countryCode;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String genericName;
}

