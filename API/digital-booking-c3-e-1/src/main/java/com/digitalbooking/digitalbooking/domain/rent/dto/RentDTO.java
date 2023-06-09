package com.digitalbooking.digitalbooking.domain.rent.dto;

import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentDTO {

    private Long id;
    private ProductDTO product;
    private UserDTO user;
    private String state;
    private Date starDate;
    private Date endDate;
    private String comment;
    private Double score;
}
