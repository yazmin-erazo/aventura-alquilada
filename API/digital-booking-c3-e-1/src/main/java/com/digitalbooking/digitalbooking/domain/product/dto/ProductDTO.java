package com.digitalbooking.digitalbooking.domain.product.dto;

import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private String brand;
    private String state;
    private BigDecimal price;
    private String description;
    private String size;
    private String gender;
    private BigDecimal deposit;
    private String category;
    private String imageURL;
    private String color;
    private String material;
    private List<ImageProductDTO> secondaryImages;
    private List<RentDatesProductDTO> rents;
    private CityDTO city;
    private List<CommentProductDTO> commentProducts;
    private Double score;

    /*public Product parseToProduct(){
        return Product.reconstruir()
    }*/

}

