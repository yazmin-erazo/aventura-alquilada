package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name="product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String brand;
    private String state;
    private BigDecimal price;
    private String description;
    private String size;
    private String gender;

}
