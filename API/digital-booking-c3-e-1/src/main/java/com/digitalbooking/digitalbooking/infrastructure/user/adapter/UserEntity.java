package com.digitalbooking.digitalbooking.infrastructure.user.adapter;

import com.digitalbooking.digitalbooking.infrastructure.product.adapter.ProductEntity;
import com.digitalbooking.digitalbooking.infrastructure.role.adapter.RoleEntity;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name="user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private String token;
    private Boolean isActive;
    private LocalDateTime GeneratingDate;
    private String initialsColor;
    @ManyToOne
    private RoleEntity roleEntity;
    @ManyToMany
    @JoinTable(
            name = "user_favorite_products",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<ProductEntity> favoriteProducts;
}
