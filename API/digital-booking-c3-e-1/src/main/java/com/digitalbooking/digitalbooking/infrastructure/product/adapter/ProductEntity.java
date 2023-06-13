package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import com.digitalbooking.digitalbooking.infrastructure.category.adapter.CategoryEntity;
import com.digitalbooking.digitalbooking.infrastructure.rent.adapter.RentEntity;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

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
    private BigDecimal deposit;
    private String imageURL;
    private Boolean isDelete;
    private String color;
    private String material;
    private String latitude;
    private String longitude;
    @ManyToOne(fetch = FetchType.LAZY)
    private CategoryEntity category;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "productEntity")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<ImageProductEntity> imageProductEntity;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "productEntity")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<RentEntity> rentEntityList;
}
