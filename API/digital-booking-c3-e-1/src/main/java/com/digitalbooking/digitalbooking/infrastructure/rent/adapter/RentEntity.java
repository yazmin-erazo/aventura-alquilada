package com.digitalbooking.digitalbooking.infrastructure.rent.adapter;

import com.digitalbooking.digitalbooking.infrastructure.product.adapter.ProductEntity;
import com.digitalbooking.digitalbooking.infrastructure.user.adapter.UserEntity;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name="rent")
public class RentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String state;
    private Date starDate;
    private Date endDate;
    private String comment;
    private String delivery;
    private Double score;
    private Date creationDate;
    @ManyToOne
    private ProductEntity productEntity;
    @ManyToOne
    private UserEntity userEntity;
}
