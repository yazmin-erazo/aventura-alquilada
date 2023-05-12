package com.digitalbooking.digitalbooking.infrastructure.category.adapter;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

}
