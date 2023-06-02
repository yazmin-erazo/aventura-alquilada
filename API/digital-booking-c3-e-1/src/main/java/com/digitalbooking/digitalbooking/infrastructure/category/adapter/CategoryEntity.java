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
    private String imageURL;
<<<<<<< HEAD
    private String description;
    private Boolean isDelete;
=======
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50

}
