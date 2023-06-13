package com.digitalbooking.digitalbooking.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentDatesProductDTO {
    private Date starDate;
    private Date endDate;
    private String state;
}
