package com.digitalbooking.digitalbooking.infrastructure.user.adapter;

import lombok.Data;

import javax.persistence.*;

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
}
