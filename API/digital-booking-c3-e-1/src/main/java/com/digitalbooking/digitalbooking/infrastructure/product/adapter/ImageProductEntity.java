package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="product_images")
public class ImageProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageURL;
    @ManyToOne
    private ProductEntity productEntity;
}
