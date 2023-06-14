package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import com.digitalbooking.digitalbooking.infrastructure.user.adapter.UserEntity;
import lombok.Data;

import javax.persistence.*;
@Data
@Entity
@Table(name="product_comments")
public class CommentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comment;
    private Double score;
    @ManyToOne
    private ProductEntity productEntity;
    @ManyToOne
    private UserEntity userEntity;
}
