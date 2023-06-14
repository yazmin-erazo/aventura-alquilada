package com.digitalbooking.digitalbooking.infrastructure.city.adapter;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name="city")
public class CityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String code;
    private String countryCode;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String genericName;
}
